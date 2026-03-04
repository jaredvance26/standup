import html2canvas from "html2canvas";

interface CaptureTableScreenshotOptions {
  containerSelector?: string;
  title?: string;
  fileNamePrefix?: string;
  fileNameDate?: string;
}

export const captureTableScreenshot = async (
  options: CaptureTableScreenshotOptions = {}
) => {
  const {
    containerSelector = ".MuiTableContainer-root",
    title: titleText = "Standup Summary",
    fileNamePrefix = "standup-summary",
    fileNameDate = new Date().toISOString().split("T")[0],
  } = options;

  const container = document.querySelector(containerSelector) as HTMLElement;
  if (!container) return;

  // Create a wrapper div to contain both title and table
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "16px";
  wrapper.style.padding = "16px";
  wrapper.style.backgroundColor = "#fff";

  // Create title element
  const titleElement = document.createElement("h2");
  titleElement.textContent = titleText;
  titleElement.style.margin = "0";
  titleElement.style.fontSize = "32px";
  titleElement.style.fontWeight = "500";
  titleElement.style.color = "#000000";
  titleElement.style.textAlign = "center";

  // Add wrapper to document temporarily
  document.body.appendChild(wrapper);

  // Clone and modify the table container
  const tableClone = container.cloneNode(true) as HTMLElement;
  tableClone.style.maxHeight = "none";
  tableClone.style.overflow = "visible";
  tableClone.style.height = "auto";

  // Add elements to wrapper
  wrapper.appendChild(titleElement);
  wrapper.appendChild(tableClone);

  // Store original styles
  const originalStyle = {
    maxHeight: container.style.maxHeight,
    overflow: container.style.overflow,
    height: container.style.height,
  };

  try {
    const canvas = await html2canvas(wrapper, {
      backgroundColor: "#fff",
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = (clonedDoc.querySelector(
          containerSelector
        ) || clonedDoc.querySelector(".MuiTableContainer-root")) as HTMLElement | null;
        if (clonedElement) {
          clonedElement.style.maxHeight = "none";
          clonedElement.style.overflow = "visible";
          clonedElement.style.height = "auto";

          // Also ensure any parent elements don't clip the content
          let parent = clonedElement.parentElement;
          while (parent) {
            parent.style.overflow = "visible";
            parent.style.maxHeight = "none";
            parent = parent.parentElement;
          }
        }
      },
    });

    const link = document.createElement("a");
    link.download = `${fileNamePrefix}-${fileNameDate}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } finally {
    // Restore original styles
    container.style.maxHeight = originalStyle.maxHeight;
    container.style.overflow = originalStyle.overflow;
    container.style.height = originalStyle.height;

    // Clean up: remove the wrapper from document
    if (wrapper.parentNode === document.body) {
      document.body.removeChild(wrapper);
    }
  }
};
