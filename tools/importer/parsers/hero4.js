/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row: none present, so empty string
  const bgRow = [''];

  // 3. Content row: heading, paragraph, and CTA (in a single cell, referencing existing elements)
  // Find grid container (accommodate possible class name variations)
  const grid = element.querySelector(':scope > .w-layout-grid, :scope > .grid-layout');
  let contentRowCell;

  if (grid) {
    // grid contains two main children: heading and content div
    const nodes = Array.from(grid.children);
    const frag = document.createDocumentFragment();
    nodes.forEach((node) => {
      // We want to preserve the heading element and the content block as they are
      frag.appendChild(node);
    });
    contentRowCell = frag;
  } else {
    // If grid not found, fallback: put all children of element in one fragment
    const frag = document.createDocumentFragment();
    Array.from(element.childNodes).forEach((n) => frag.appendChild(n));
    contentRowCell = frag;
  }

  const contentRow = [contentRowCell];

  // 4. Create table and replace original element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
