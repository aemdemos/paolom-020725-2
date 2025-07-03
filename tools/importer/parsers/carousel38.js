/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as required
  const cells = [['Carousel (carousel38)']];

  // Get the main grid (2 columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  let contentCol = null;
  let imagesCol = null;
  // Determine which is the text/button column and which is the images column
  for (const child of gridChildren) {
    if (child.querySelector('h1, h2, h3, h4, h5, h6, p')) {
      contentCol = child;
    } else if (child.querySelector('.w-layout-grid img')) {
      imagesCol = child.querySelector('.w-layout-grid');
    }
  }

  // Extract text, desc, and buttons (from contentCol)
  let titleEl = null;
  let descEl = null;
  let buttons = [];
  if (contentCol) {
    titleEl = contentCol.querySelector('h1, h2, h3, h4, h5, h6');
    descEl = contentCol.querySelector('p');
    const buttonGroup = contentCol.querySelector('.button-group');
    if (buttonGroup) {
      buttons = Array.from(buttonGroup.querySelectorAll('a'));
    }
  }

  // Each image slide: first gets text/buttons in second cell, others blank
  if (imagesCol) {
    const imgs = Array.from(imagesCol.querySelectorAll('img'));
    imgs.forEach((img, idx) => {
      if (idx === 0) {
        // First slide: text and buttons in cell 2
        const slideContent = [];
        if (titleEl) slideContent.push(titleEl);
        if (descEl) slideContent.push(descEl);
        if (buttons.length) {
          const btnDiv = document.createElement('div');
          btnDiv.append(...buttons);
          slideContent.push(btnDiv);
        }
        cells.push([img, slideContent.length > 0 ? slideContent : '']);
      } else {
        // Other slides: just the image
        cells.push([img, '']);
      }
    });
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
