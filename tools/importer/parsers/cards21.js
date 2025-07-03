/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Cards (cards21)'];
  // Get all direct child cards
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(card => {
    // Icon: find the first .icon element (including its SVG)
    const icon = card.querySelector('.icon');
    // Text: find the first <p> with text (likely .utility-margin-bottom-0)
    const text = card.querySelector('p');
    // Edge case: missing icon or text
    return [icon || '', text || ''];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}