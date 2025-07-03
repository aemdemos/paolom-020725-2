/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Must exactly match the given block name
  const headerRow = ['Hero (hero33)'];

  // Background image row: None present in this HTML
  const imageRow = [''];

  // Find the grid container within the element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Prepare content cell: gather all relevant content, referencing existing DOM nodes
  const contentCell = [];

  // 1. Left column name (likely a subheading/speaker/segment)
  // 2. Tag list (optional subheading or meta info)
  // 3. Main heading (h2)
  // 4. Description block (paragraphs)

  // The grid has 4 main direct children:
  // [0] Name (div.paragraph-xl)
  // [1] Tag list (div.flex-vertical)
  // [2] Heading (h2)
  // [3] Rich text (div.rich-text)
  // We'll insert them in the same order if present

  const gridChildren = grid.querySelectorAll(':scope > *');
  for (let i = 0; i < gridChildren.length; i++) {
    const el = gridChildren[i];
    // Only append if it has meaningful content
    if (el.textContent && el.textContent.trim().length > 0) {
      contentCell.push(el);
    }
  }

  // Compose the table with one column and three rows
  const cells = [headerRow, imageRow, [contentCell]];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
