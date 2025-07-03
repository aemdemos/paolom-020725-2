/* global WebImporter */
export default function parse(element, { document }) {
  // Get the inner grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  // Find direct image and content elements
  let imgEl = null, contentEl = null;
  for (const child of children) {
    if (child.tagName === 'IMG') imgEl = child;
    else contentEl = child;
  }
  // Compose content cell (all content block's children in order)
  let contentFragments = [];
  if (contentEl) {
    // Collect all children in appearance order
    contentFragments = Array.from(contentEl.childNodes).filter(node => {
      // filter out empty text nodes
      if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return false;
      return true;
    });
  }
  // Build the block table
  const cells = [
    ['Hero (hero7)'],
    [imgEl ? imgEl : ''],
    [contentFragments.length > 0 ? contentFragments : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
