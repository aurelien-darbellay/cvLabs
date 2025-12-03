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

function normalizeBadges(doc: Document) {
  doc.querySelectorAll<HTMLElement>("[data-badge]").forEach((el) => {
    el.style.display = "inline-flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.verticalAlign = "middle";
    el.style.lineHeight = "1.2";
    el.style.boxSizing = "border-box";
    el.style.fontSize = "12px";
    el.style.padding = "4px 10px";
    el.style.minHeight = "18px";
  });
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename = "cv.pdf"
) {
  // console.log("Starting PDF export...");
  const { width, height } = element.getBoundingClientRect();
  // console.log("Element dimensions", {
  //   width,
  //   height,
  //   scrollWidth: element.scrollWidth,
  //   scrollHeight: element.scrollHeight,
  // });
  // console.time("html2canvas render");
  const canvas = await html2canvas(element, {
    scale: 4,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    onclone: (doc) => {
      // console.log("Cloned document", doc.documentElement.outerHTML);
      normalizeColours(doc);
      normalizeBadges(doc);
    },
  });
  // console.timeEnd("html2canvas render");
  // console.log("Canvas ready", { width: canvas.width, height: canvas.height });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  // console.log("Image properties", {
  //   width: imgProps.width,
  //   height: imgProps.height,
  //   colorSpace: imgProps.colorSpace,
  // });

  const margin = 0;
  const printableWidth = PDF_PAGE_WIDTH;
  const imgHeight = (imgProps.height * printableWidth) / imgProps.width;
  const totalPages = Math.max(1, Math.ceil(imgHeight / PDF_PAGE_HEIGHT));
  // console.log("Preparing PDF layout", {
  //   printableWidth,
  //   imgHeight,
  //   totalPages,
  // });

  let heightLeft = imgHeight;
  let position = margin;

  let pageIndex = 1;
  // console.log("Adding page", { pageIndex, position, heightLeft });
  pdf.addImage(imgData, "PNG", margin, position, printableWidth, imgHeight);
  heightLeft -= PDF_PAGE_HEIGHT;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight + margin;
    pageIndex += 1;
    // console.log("Adding page", { pageIndex, position, heightLeft });
    pdf.addPage();
    pdf.addImage(imgData, "PNG", margin, position, printableWidth, imgHeight);
    heightLeft -= PDF_PAGE_HEIGHT;
  }

  // console.log(`Saving PDF as ${filename}`);
  pdf.save(filename);
}
