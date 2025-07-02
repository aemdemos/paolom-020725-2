/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards3) block: icon left, text right, one row per card
  const headerRow = ['Cards (cards3)'];

  // Get all immediate card containers
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  
  // Handle empty element edge case
  if (cardDivs.length === 0) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  const rows = cardDivs.map(card => {
    // Icon cell (first child with .icon)
    const iconDiv = card.querySelector('.icon');
    // Text cell (first p)
    const textP = card.querySelector('p');
    
    // If either is missing, fill with empty string to keep structure stable
    return [iconDiv || '', textP || ''];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
