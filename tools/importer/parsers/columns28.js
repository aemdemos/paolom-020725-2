/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector('.container');
  if (!container) return;
  // The main grid contains the relevant content
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  // Get all direct children of the main grid (should be 3: h2, p, nested grid)
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 3) return;

  // left column: heading and avatar/author info (from nested grid)
  const heading = gridChildren[0];
  const nestedGrid = gridChildren[2];

  // We'll grab the avatar/testimonial flex row from the nested grid
  let testimonialRow = null;
  // Find the .flex-horizontal row inside nestedGrid
  if (nestedGrid) {
    testimonialRow = nestedGrid.querySelector('.flex-horizontal');
  }
  // Compose the left column: heading, testimonial row (if exists)
  const leftColFragment = document.createElement('div');
  if (heading) leftColFragment.appendChild(heading);
  if (testimonialRow) leftColFragment.appendChild(testimonialRow);

  // right column: quote paragraph and logo (svg)
  const quote = gridChildren[1];
  let logo = null;
  // In the nestedGrid, look for the last child that is not the divider and not the testimonial row
  if (nestedGrid) {
    // Find all children of the nested grid that are SVGs or utility-display-inline-block
    const possible = Array.from(nestedGrid.children).filter(el => el.classList.contains('utility-display-inline-block') || el.tagName === 'SVG');
    logo = possible.length ? possible[possible.length-1] : null;
  }
  const rightColFragment = document.createElement('div');
  if (quote) rightColFragment.appendChild(quote);
  if (logo) rightColFragment.appendChild(logo);

  // Table per Columns block pattern
  const headerRow = ['Columns (columns28)'];
  const contentRow = [leftColFragment, rightColFragment];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
