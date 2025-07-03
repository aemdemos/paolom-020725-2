/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column seems to contain a single image in another div
  const columnContent = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : '';
  });
  // Header row must be a single cell array (will span all columns via implementation)
  const cells = [
    ['Columns (columns31)'],
    columnContent
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
