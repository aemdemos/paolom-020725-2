/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per block definition
  const headerRow = ['Cards (cards15)'];

  // Get all cards (direct children anchor tags)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // For each card, extract image and text content
  const rows = cardLinks.map((card) => {
    // Image (first child div containing img)
    let imgEl = null;
    const imgDiv = card.querySelector(':scope > div');
    if (imgDiv) {
      imgEl = imgDiv.querySelector('img');
    }

    // Text column: include tag/date row(s) and heading
    const contentParts = [];
    const meta = card.querySelector('.flex-horizontal');
    if (meta) contentParts.push(meta);
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) contentParts.push(heading);

    return [imgEl, contentParts];
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
