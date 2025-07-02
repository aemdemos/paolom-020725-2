/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes
  const tabPanes = element.querySelectorAll(':scope > .w-tab-pane');
  // Find the active tab, or fallback to first
  let pane = null;
  for (let i = 0; i < tabPanes.length; i++) {
    if (tabPanes[i].classList.contains('w--tab-active')) {
      pane = tabPanes[i];
      break;
    }
  }
  if (!pane && tabPanes.length > 0) {
    pane = tabPanes[0];
  }
  if (!pane) return;

  // The layout grid contains all hero content
  const grid = pane.querySelector(':scope > .w-layout-grid, :scope > div');
  if (!grid) return;

  // Find the first image in the grid for the background image row
  const img = grid.querySelector('img');

  // Collect all non-img nodes for the content row
  const content = [];
  grid.childNodes.forEach((node) => {
    if (node.nodeType === 1 && node.tagName.toLowerCase() !== 'img') {
      content.push(node);
    } else if (node.nodeType === 3 && node.textContent.trim()) {
      // preserve plain text nodes
      const span = document.createElement('span');
      span.textContent = node.textContent;
      content.push(span);
    }
  });

  // Build block table
  const cells = [
    ['Hero'],
    [img ? img : ''],
    [content.length ? content : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
