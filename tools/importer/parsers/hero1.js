/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing image and content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);
  let imageEl = null;
  let contentEl = null;
  // Identify image and content columns
  for (const child of children) {
    if (child.tagName === 'IMG') imageEl = child;
    else if (child.nodeType === 1) contentEl = child;
  }
  // Fallbacks if structure is off
  if (!imageEl) imageEl = grid.querySelector('img');
  if (!contentEl) {
    // Try to find first div that's not image
    const candidates = Array.from(grid.querySelectorAll('div'));
    contentEl = candidates.find(div => div !== imageEl);
  }
  // Defensive: If still missing, use placeholder empty div
  if (!imageEl) imageEl = document.createElement('div');
  if (!contentEl) contentEl = document.createElement('div');
  // Table structure as per spec
  const cells = [
    ['Hero (hero1)'],
    [imageEl],
    [contentEl]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
