/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: only one cell ('Tabs'), as in the example
  const headerRow = ['Tabs'];

  // Get all tab links
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  // Each tab row: [label, content], content not present in this element
  const rows = tabLinks.map((tabLink) => {
    const labelDiv = tabLink.querySelector('div');
    const label = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();
    return [label, ''];
  });

  // Compose table rows, header row first
  const cells = [headerRow, ...rows];

  // After table creation, manually set colspan=2 for the header cell to visually match the example
  const table = WebImporter.DOMUtils.createTable(cells, document);
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
