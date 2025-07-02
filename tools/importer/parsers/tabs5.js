/* global WebImporter */
export default function parse(element, { document }) {
  // Extract tab labels (the <a> elements with text inside a div)
  const tabLinks = Array.from(element.querySelectorAll('a[role="tab"]'));

  // Table header row: exactly one cell, as per example
  const rows = [['Tabs']];

  // Each subsequent row: [Tab Label, Tab Content]
  // In the provided HTML, only labels exist, so content cell is left empty
  tabLinks.forEach((tabLink) => {
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    rows.push([label, '']);
  });

  // Create block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
