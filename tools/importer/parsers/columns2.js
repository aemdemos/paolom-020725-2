/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;
  // Header row: exactly one cell with the block name
  const headerRow = ['Columns (columns2)'];
  // Data row: one cell containing an array of the column content
  const dataRow = [columns];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);
  element.replaceWith(table);
}
