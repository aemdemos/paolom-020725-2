/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid columns container (w-layout-grid is the main row)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Compose the table header, exactly as required
  const headerRow = ['Columns (columns8)'];

  // Compose the content row: each original column becomes one cell
  // Reference the existing elements (not cloning or stringifying)
  const contentRow = columns.map(col => col);

  // Build the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}