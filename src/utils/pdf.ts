import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { oklchToRgbString } from "./color";

const PDF_PAGE_WIDTH = 210; // A4 width in mm
const PDF_PAGE_HEIGHT = 297; // A4 height in mm
const OKLCH_REGEX = /oklch\([^)]*\)/gi;
const OKLCH_FALLBACK = "#1f2937"; // neutral dark slate fallback

interface LinkInfo {
  href: string;
  x: number; // mm
  y: number; // mm
  width: number; // mm
  height: number; // mm
  page: number;
}

function convertOklch(value?: string | null) {
  if (!value) return value;
  return value.replace(
    OKLCH_REGEX,
    (match) => oklchToRgbString(match) || OKLCH_FALLBACK
  );
}

function normalizeColours(doc: Document) {
  doc.querySelectorAll("style").forEach((style) => {
    if (style.textContent && OKLCH_REGEX.test(style.textContent)) {
      style.textContent = convertOklch(style.textContent) || "";
    }
  });
  doc.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
    const inlineStyle = el.getAttribute("style");
    if (inlineStyle && OKLCH_REGEX.test(inlineStyle)) {
      el.setAttribute("style", convertOklch(inlineStyle) || "");
    }
  });
}

function extractLinks(element: HTMLElement, scale: number): LinkInfo[] {
  const links: LinkInfo[] = [];
  const links_elements = element.querySelectorAll<HTMLAnchorElement>("a[href]");

  links_elements.forEach((linkEl) => {
    const href = linkEl.getAttribute("href");
    if (!href) return;

    const rect = linkEl.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    // Calculate relative position within element
    const relativeX = rect.left - elementRect.left;
    const relativeY = rect.top - elementRect.top;

    // Convert to PDF coordinates (mm)
    // scale is canvas pixels per element pixel, we need to convert to mm
    const mmPerPixel = PDF_PAGE_WIDTH / element.scrollWidth;

    links.push({
      href,
      x: relativeX * mmPerPixel,
      y: relativeY * mmPerPixel,
      width: rect.width * mmPerPixel,
      height: rect.height * mmPerPixel,
      page: 0, // Will be calculated during PDF generation
    });
  });

  return links;
}

function addLinksToPDF(
  pdf: jsPDF,
  links: LinkInfo[],
  imgHeight: number,
  printableWidth: number
) {
  const totalPages = Math.max(1, Math.ceil(imgHeight / PDF_PAGE_HEIGHT));

  links.forEach((link) => {
    // Calculate which page this link appears on
    let currentY = 0;
    let pageNum = 1;

    for (let i = 0; i < totalPages; i++) {
      const pageTop = i * PDF_PAGE_HEIGHT;
      const pageBottom = (i + 1) * PDF_PAGE_HEIGHT;

      // If link is within this page's range
      if (link.y >= pageTop && link.y < pageBottom) {
        pageNum = i + 1;
        currentY = link.y - pageTop;
        break;
      }
    }

    // Go to the correct page if we're on a multi-page PDF
    if (pageNum !== 1) {
      pdf.setPage(pageNum);
    }

    // Add link annotation
    pdf.textWithLink(" ", link.x, currentY + link.height / 2, {
      pageNumber: pageNum,
      pageY: currentY,
      pageX: link.x,
    });

    // Add invisible clickable rectangle
    pdf.link(link.x, currentY, link.width, link.height, {
      pageNumber: pageNum,
      url: link.href,
    });
  });
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename = "cv.pdf"
) {
  // Extract links before rendering
  const links = extractLinks(element, 5);

  const canvas = await html2canvas(element, {
    scale: 5,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (doc) => {
      normalizeColours(doc);
    },
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.5);
  const pdf = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: true,
  });
  const imgProps = pdf.getImageProperties(imgData);

  const margin = 0;
  const printableWidth = PDF_PAGE_WIDTH;
  const imgHeight = (imgProps.height * printableWidth) / imgProps.width;
  const totalPages = Math.max(1, Math.ceil(imgHeight / PDF_PAGE_HEIGHT));

  let heightLeft = imgHeight;
  let position = margin;

  let pageIndex = 1;
  pdf.addImage(imgData, "JPEG", margin, position, printableWidth, imgHeight);
  heightLeft -= PDF_PAGE_HEIGHT;

  while (heightLeft > 10) {
    position = heightLeft - imgHeight + margin;
    pageIndex += 1;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", margin, position, printableWidth, imgHeight);
    heightLeft -= PDF_PAGE_HEIGHT;
  }

  // Add links to PDF
  addLinksToPDF(pdf, links, imgHeight, printableWidth);

  pdf.save(filename);
}
