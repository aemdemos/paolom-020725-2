/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row: single cell with block name
  const headerRow = ['Columns (columns9)'];
  // Content row: each column as a cell
  const contentRow = columns;

  // Build the block table: header (single cell), then content row (multiple columns)
  const cells = [
    headerRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
