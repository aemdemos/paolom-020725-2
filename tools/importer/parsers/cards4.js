/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly the block name from instructions
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // All direct child <a> cards
  const cardAnchors = element.querySelectorAll(':scope > a');

  cardAnchors.forEach(card => {
    // Find image (assume first img in the card)
    const img = card.querySelector('img');

    // Find the text content
    // It's inside a grid, with one grid child that's not the img
    let textContentDiv = null;
    // There are two immediate children to the grid inside the anchor:
    // [img, textContentDiv] (order may vary, so check)
    const grid = card.querySelector('.w-layout-grid');
    if (grid) {
      // get all children that are not the image
      const children = Array.from(grid.children);
      textContentDiv = children.find(child => child !== img);
    }
    // If not found, fallback to card (should not happen with this structure)
    if (!textContentDiv) textContentDiv = card;

    // Place the existing elements (not clones) in the row
    rows.push([img, textContentDiv]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}