/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout for the columns block
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children (these are the column blocks)
  const columns = Array.from(grid.children);

  // Compose the table header and content row, matching the example: header is a single cell only
  const headerRow = ['Columns (columns5)'];
  // The content row: all column divs are grouped into a single cell (array of elements)
  const contentRow = [columns];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the generated block table
  element.replaceWith(table);
}
