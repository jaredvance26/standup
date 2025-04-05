import html2canvas from 'html2canvas';

export const captureTableScreenshot = async () => {
  const container = document.querySelector('.MuiTableContainer-root') as HTMLElement;
  if (!container) return;

  // Store original styles
  const originalStyle = {
    maxHeight: container.style.maxHeight,
    overflow: container.style.overflow,
    height: container.style.height
  };

  // Temporarily modify the container to show full content
  container.style.maxHeight = 'none';
  container.style.overflow = 'visible';
  container.style.height = 'auto';

  try {
    const canvas = await html2canvas(container, {
      backgroundColor: '#fff',
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('.MuiTableContainer-root') as HTMLElement;
        if (clonedElement) {
          clonedElement.style.maxHeight = 'none';
          clonedElement.style.overflow = 'visible';
          clonedElement.style.height = 'auto';
        }
      }
    });

    const link = document.createElement('a');
    link.download = `standup-summary-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    // Restore original styles
    container.style.maxHeight = originalStyle.maxHeight;
    container.style.overflow = originalStyle.overflow;
    container.style.height = originalStyle.height;
  }
};