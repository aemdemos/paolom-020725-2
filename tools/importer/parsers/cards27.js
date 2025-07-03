/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must exactly match the block name
  const headerRow = ['Cards (cards27)'];
  const rows = [];
  // Each direct child div represents a card
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  cards.forEach(card => {
    // Find the image (mandatory)
    const img = card.querySelector('img');
    // Find the text container if present
    let textCell = '';
    // Look for card content following the pattern .utility-padding-all-2rem
    const padContent = card.querySelector('.utility-padding-all-2rem');
    if (padContent) {
      textCell = padContent;
    } else {
      // fallback: look for any h1-h6 or p inside this card
      const bits = [];
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) bits.push(heading);
      const paragraphs = card.querySelectorAll('p');
      if (paragraphs.length) bits.push(...paragraphs);
      if (bits.length) textCell = bits;
    }
    // Only include a row if an image exists (per spec)
    if (img) {
      rows.push([
        img,
        textCell || ''
      ]);
    }
  });
  if (rows.length) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ...rows
    ], document);
    element.replaceWith(table);
  }
}
