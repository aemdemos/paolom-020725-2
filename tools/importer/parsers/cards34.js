/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row (exact match to example)
  const headerRow = ['Cards (cards34)'];

  // 2. Get all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // 3. Extract for each card: image, and text block (title, desc, extras)
  const rows = cardLinks.map(card => {
    // Find the card image: first img descendant
    const img = card.querySelector('img');

    // Find the text content block
    // Structure: a > div (grid) > div (text area)
    const allGrids = card.querySelectorAll(':scope > div');
    let textContentDiv = null;
    if (allGrids.length) {
      // The grid typically has children: [img, text-content-div], or just [img] and text-content is inside the grid
      // The text content is the first div inside the grid that is not an image
      const insideGrid = allGrids[0];
      // Find div child of grid that is not an image and not the tag/min-read container
      const children = Array.from(insideGrid.children);
      textContentDiv = children.find(child =>
        child.tagName === 'DIV' &&
        child.querySelector('h3, .h4-heading, p, .tag, .paragraph-sm'));
      // Sometimes, text block is direct child (after img), not wrapped
      if (!textContentDiv) {
        // Try: the div after the img
        textContentDiv = children.find(child => child !== img && child.tagName === 'DIV');
      }
    }
    // Fallback if above fails: last div in card
    if (!textContentDiv) {
      const allDivs = card.querySelectorAll('div');
      textContentDiv = allDivs[allDivs.length - 1];
    }
    // Defensive: if no text block, create empty div
    if (!textContentDiv) {
      textContentDiv = document.createElement('div');
    }
    return [img, textContentDiv];
  });

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace old element
  element.replaceWith(table);
}
