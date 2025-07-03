/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container for the columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // The grid contains columns: each immediate child is a column
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Reference the existing elements directly for each cell
  // This ensures all the text and semantic content is included
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  const cells = [
    ['Columns (columns8)'],
    [leftCol, rightCol]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
