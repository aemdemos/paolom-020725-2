/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per example
  const headerRow = ['Hero (hero29)'];

  // Get .grid-layout
  const grid = element.querySelector('.grid-layout');

  // Find the image (background image)
  let bgImg = null;
  if (grid) {
    bgImg = grid.querySelector('img');
  }
  // 2nd row: background image (img element or empty string)
  const backgroundRow = [bgImg || ''];

  // Find the main content block (first direct div child of grid)
  let contentBlock = null;
  if (grid) {
    const directDivs = grid.querySelectorAll(':scope > div');
    if (directDivs.length > 0) {
      contentBlock = directDivs[0];
    }
  }
  // 3rd row: content (reference the entire block for resilience)
  const contentRow = [contentBlock || ''];

  // Compose block table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
