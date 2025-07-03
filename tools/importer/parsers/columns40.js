/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Table header row: exactly one cell (matches markdown example)
  const headerRow = ['Columns (columns40)'];
  // Second row: one cell per column (as in the HTML example)
  const contentRow = columns;

  // Build the cells structure as required: first row has one cell, second row has n cells
  const cells = [headerRow, contentRow];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
