/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Cards (cards35) block
  const headerRow = ['Cards (cards35)'];
  // Each card is a .utility-aspect-1x1 > img, only images are present in source
  const cards = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));
  const rows = cards.map(cardDiv => {
    // Reference the img directly, and leave second column empty as no text is present
    const img = cardDiv.querySelector('img');
    return [img, ''];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
