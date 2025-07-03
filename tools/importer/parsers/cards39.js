/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to bundle text content from nodes
  function bundleTextContent(nodes) {
    const fragment = document.createDocumentFragment();
    nodes.forEach(node => {
      if (node) fragment.appendChild(node);
    });
    return fragment;
  }

  // Find the main grid containing all cards
  let mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  let cardAnchors = [];

  if (mainGrid) {
    // If nested grids, flatten out all .utility-link-content-block anchors
    let children = Array.from(mainGrid.children);
    children.forEach(child => {
      if (child.matches('a.utility-link-content-block')) {
        cardAnchors.push(child);
      } else if (child.matches('.w-layout-grid')) {
        cardAnchors.push(...child.querySelectorAll('a.utility-link-content-block'));
      }
    });
  } else {
    // fallback: all anchors inside element
    cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));
  }

  const cells = [];
  // Table header as per the example
  cells.push(['Cards (cards39)']);

  cardAnchors.forEach(card => {
    // IMAGE: find any <img> in the card, and prefer its aspect-ratio wrapping div for structure
    let img = card.querySelector('img');
    let imgWrap = img ? img.closest('div') : null;
    let imageCell = imgWrap || img || '';

    // TEXT: gather all heading(s), paragraph(s), and CTA(s)/button(s) in order, only direct descendants
    // Title
    let heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    // Description (first <p> under the card)
    let paragraph = card.querySelector('p');
    // CTA (commonly .button, but might be other variants)
    let cta = card.querySelector('.button, .cta, .cta-button, button, a.button');
    // Compose text fragment preserving order
    const textContent = [];
    if (heading) textContent.push(heading);
    if (paragraph) textContent.push(paragraph);
    if (cta) textContent.push(cta);
    const textCell = bundleTextContent(textContent);

    cells.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
