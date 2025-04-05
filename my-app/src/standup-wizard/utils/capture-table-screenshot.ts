import html2canvas from "html2canvas";

export const captureTableScreenshot = async () => {
  const container = document.querySelector(
    ".MuiTableContainer-root"
  ) as HTMLElement;
  if (!container) return;

  // Create a wrapper div to contain both title and table
  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "16px";
  wrapper.style.padding = "16px";
  wrapper.style.backgroundColor = "#fff";

  // Create title element
  const title = document.createElement("h2");
  title.textContent = "Standup Summary";
  title.style.margin = "0";
  title.style.fontSize = "32px";
  title.style.fontWeight = "500";
  title.style.color = "#000000";
  title.style.textAlign = "center";

  // Add wrapper to document temporarily
  document.body.appendChild(wrapper);

  // Clone and modify the table container
  const tableClone = container.cloneNode(true) as HTMLElement;
  tableClone.style.maxHeight = "none";
  tableClone.style.overflow = "visible";
  tableClone.style.height = "auto";

  // Add elements to wrapper
  wrapper.appendChild(title);
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
        const clonedElement = clonedDoc.querySelector(
          ".MuiTableContainer-root"
        ) as HTMLElement;
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
    link.download = `standup-summary-${
      new Date().toISOString().split("T")[0]
    }.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } finally {
    // Restore original styles
    container.style.maxHeight = originalStyle.maxHeight;
    container.style.overflow = originalStyle.overflow;
    container.style.height = originalStyle.height;

    // Clean up: remove the wrapper from document
    document.body.removeChild(wrapper);
  }
};
