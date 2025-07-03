/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, use the DIV as-is to preserve wrappers/aspect
  const contentRow = columns.map(col => col);
  // Table structure: first row is header, second row is columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns13)'],
    contentRow
  ], document);
  element.replaceWith(table);
}
