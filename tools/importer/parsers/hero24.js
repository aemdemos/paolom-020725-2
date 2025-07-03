/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane or default to first
  const tabPane = element.querySelector('.w-tab-pane.w--tab-active') || element.querySelector('.w-tab-pane');
  if (!tabPane) return;

  // Find grid in tab pane
  const grid = tabPane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of grid (order should preserve heading then image)
  const children = Array.from(grid.children);
  let imageEl = null;
  let textEls = [];
  children.forEach(child => {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else {
      textEls.push(child);
    }
  });
  // If no textEls found, fallback to grid.textContent
  let textContent = textEls.length ? textEls : '';

  // Build rows as per block spec: [header], [image], [text]. Each row exactly 1 cell.
  const rows = [
    ['Hero (hero24)'],
    [imageEl ? imageEl : ''],
    [textContent && textContent.length === 1 ? textContent[0] : (textContent.length > 1 ? textContent : '')]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
