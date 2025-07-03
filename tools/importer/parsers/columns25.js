/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // Each direct child of the grid is a column block
  const columns = Array.from(grid.children);

  // Build the table: first row is header, second is columns
  const cells = [
    ['Columns (columns25)'],
    columns
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
