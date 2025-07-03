/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must be exactly one column with the block name
  const headerRow = ['Columns (columns16)'];

  // Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');

  let columns = [];
  if (grid) {
    // Each immediate child of the grid is a column
    columns = Array.from(grid.children);
  } else {
    // fallback: treat all direct children of the element as columns
    columns = Array.from(element.children);
  }

  // Defensive: Remove columns with no content
  columns = columns.filter(col => {
    if (!col) return false;
    if (col.textContent && col.textContent.trim() !== '') return true;
    if (col.querySelector('*')) return true;
    return false;
  });

  // Create block table: header row (1 cell), then one row with N columns (one per content area)
  const table = [
    headerRow,
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
