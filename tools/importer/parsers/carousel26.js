/* global WebImporter */
export default function parse(element, { document }) {
  // Header row should be a single cell, even if the table has 2 columns in slide rows
  const headerRow = ['Carousel (carousel26)'];

  // Find the card body that contains the content
  const cardBody = element.querySelector('.card-body');

  // Defensive: if card body is missing, output only header row
  if (!cardBody) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Extract image (mandatory)
  const imgEl = cardBody.querySelector('img');

  // Extract title (if present)
  let textCell = '';
  const titleEl = cardBody.querySelector('.h4-heading');
  if (titleEl) {
    // Use heading element for semantic meaning, upgrade to h2 as in markdown example
    let headingNode;
    if (/^H[1-6]$/i.test(titleEl.tagName)) {
      headingNode = titleEl;
    } else {
      headingNode = document.createElement('h2');
      headingNode.textContent = titleEl.textContent;
    }
    textCell = headingNode;
  }

  // Slide row: 2 cells (image, text)
  const slideRow = [imgEl, textCell];

  // Compose table: first row is single-cell header, second row is two cells
  const rows = [headerRow, slideRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
