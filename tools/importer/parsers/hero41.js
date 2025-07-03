/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: Block name matches example
  const headerRow = ['Hero (hero41)'];

  // 2. Second row: background image (img)
  // Find the image from the grid layout's first child
  let backgroundImg = '';
  const gridLayout = element.querySelector(':scope > .w-layout-grid');
  if (gridLayout) {
    const gridDivs = gridLayout.querySelectorAll(':scope > div');
    if (gridDivs.length > 0) {
      const img = gridDivs[0].querySelector('img');
      if (img) backgroundImg = img;
    }
  }
  const imageRow = [backgroundImg];

  // 3. Third row: headline, paragraph, CTA (all content block)
  let contentCell = document.createElement('div');
  if (gridLayout && gridLayout.children.length > 1) {
    // The text content is in the second grid cell
    const textBlockDiv = gridLayout.children[1];
    // Look for a nested grid (e.g. .w-layout-grid)
    let contentGrid = textBlockDiv.querySelector('.w-layout-grid');
    if (contentGrid) {
      // Headline (h1)
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentCell.appendChild(h1);
      // Paragraph and CTA inside .flex-vertical
      const flexVertical = contentGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        // Paragraph
        const para = flexVertical.querySelector('p');
        if (para) contentCell.appendChild(para);
        // Button CTA inside .button-group
        const btnGroup = flexVertical.querySelector('.button-group');
        if (btnGroup) {
          btnGroup.querySelectorAll('a,button').forEach(btn => contentCell.appendChild(btn));
        }
      }
    }
  }
  const contentRow = [contentCell];

  // Compose the block table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
