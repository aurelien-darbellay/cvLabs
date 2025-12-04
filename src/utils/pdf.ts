import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { oklchToRgbString } from "./color";

const PDF_PAGE_WIDTH = 210; // A4 width in mm
const PDF_PAGE_HEIGHT = 297; // A4 height in mm
const OKLCH_REGEX = /oklch\([^)]*\)/gi;
const OKLCH_FALLBACK = "#1f2937"; // neutral dark slate fallback

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

export async function exportElementToPdf(
  element: HTMLElement,
  filename = "cv.pdf"
) {
  const canvas = await html2canvas(element, {
    scale: 8,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (doc) => {
      normalizeColours(doc);
    },
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);

  const margin = 0;
  const printableWidth = PDF_PAGE_WIDTH;
  const imgHeight = (imgProps.height * printableWidth) / imgProps.width;
  const totalPages = Math.max(1, Math.ceil(imgHeight / PDF_PAGE_HEIGHT));

  let heightLeft = imgHeight;
  let position = margin;

  let pageIndex = 1;
  pdf.addImage(imgData, "PNG", margin, position, printableWidth, imgHeight);
  heightLeft -= PDF_PAGE_HEIGHT;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + margin;
    pageIndex += 1;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", margin, position, printableWidth, imgHeight);
    heightLeft -= PDF_PAGE_HEIGHT;
  }

  pdf.save(filename);
}
