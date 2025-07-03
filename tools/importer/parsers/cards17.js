/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children a elements (each card)
  function extractCardsFromGrid(grid) {
    const rows = [];
    // Each card is an <a> direct child of the grid
    const cards = Array.from(grid.querySelectorAll(':scope > a'));
    cards.forEach(card => {
      // FIRST COLUMN: Image (or blank string if none)
      let imageEl = null;
      // Look for utility-aspect-3x2 container
      const aspect = card.querySelector('.utility-aspect-3x2');
      if (aspect) {
        imageEl = aspect.querySelector('img');
      }
      // SECOND COLUMN: Text (heading + description)
      let textContent = [];
      // Try to find heading (h3 or .h4-heading)
      let heading = card.querySelector('h3, .h4-heading');
      if (!heading) {
        // Sometimes it's nested within .utility-text-align-center
        const textCenter = card.querySelector('.utility-text-align-center');
        if (textCenter) {
          heading = textCenter.querySelector('h3, .h4-heading');
        }
      }
      if (heading) textContent.push(heading);
      // Try to find description (class paragraph-sm)
      let desc = card.querySelector('.paragraph-sm');
      if (!desc) {
        // Sometimes it's nested
        const textCenter = card.querySelector('.utility-text-align-center');
        if (textCenter) {
          desc = textCenter.querySelector('.paragraph-sm');
        }
      }
      if (desc) textContent.push(desc);
      // Always reference existing elements (not clones/copies)
      rows.push([
        imageEl ? imageEl : '',
        textContent.length ? textContent : ''
      ]);
    });
    return rows;
  }

  // Table header
  const headerRow = ['Cards (cards17)'];
  const tableRows = [headerRow];

  // Find all tab panes (they appear to be all immediate child divs)
  const tabPanes = Array.from(element.querySelectorAll(':scope > div'));
  tabPanes.forEach(tabPane => {
    // Each tabPane contains a .grid-layout or .w-layout-grid
    const grid = tabPane.querySelector('.w-layout-grid, .grid-layout');
    if (grid) {
      const cardsRows = extractCardsFromGrid(grid);
      tableRows.push(...cardsRows);
    }
  });

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}