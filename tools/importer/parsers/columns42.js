/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children divs
  const getDirectDivs = (parent) => Array.from(parent.children).filter(el => el.tagName === 'DIV');

  // Get .container
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Get the first .w-layout-grid (main content grid)
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length < 1) return;

  const mainGrid = grids[0];
  const mainGridDivs = getDirectDivs(mainGrid);
  if (mainGridDivs.length < 2) return;

  // --- Column 1 (left): eyebrow and headline ---
  const leftCol = mainGridDivs[0]; // This contains eyebrow and h1
  // --- Column 2 (right): description, author, button ---
  const rightCol = mainGridDivs[1]; // This contains paragraph, author meta, and button

  // --- Images grid (second grid for images) ---
  // It is the next grid after the main content grid
  // Look for a grid with image children
  let imagesGrid;
  for (let i = 1; i < grids.length; i++) {
    if (grids[i].querySelector('img')) {
      imagesGrid = grids[i];
      break;
    }
  }
  if (!imagesGrid) return;
  // Get the images from the grid
  const aspectDivs = imagesGrid.querySelectorAll(':scope > .utility-aspect-1x1');
  const imgEls = [];
  aspectDivs.forEach(div => {
    const img = div.querySelector('img');
    if (img) imgEls.push(img);
  });
  // Ensure two columns. If less images, cell is empty
  while (imgEls.length < 2) imgEls.push('');

  // Build the table
  const headerRow = ['Columns (columns42)'];
  const firstContentRow = [leftCol, rightCol];
  const secondContentRow = [imgEls[0], imgEls[1]];

  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
