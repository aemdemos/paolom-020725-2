/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as in the sample
  const headerRow = ['Hero (hero12)'];

  // Find the main grid inside the section
  const grid = element.querySelector(':scope > .w-layout-grid');
  let backgroundImg = '';
  let contentCell = [];

  if (grid) {
    // Identify image and content container
    let img = null;
    let container = null;
    Array.from(grid.children).forEach((child) => {
      if (child.tagName === 'IMG' && !img) {
        img = child;
      } else if (child.tagName === 'DIV' && child.classList.contains('container') && !container) {
        container = child;
      }
    });

    // Row 2: Background image (can be empty)
    backgroundImg = img ? img : '';

    // Row 3: Title, subheading, CTA all in one cell (can be empty)
    if (container) {
      // The text content is in the first .section inside the container
      const section = container.querySelector(':scope > .section');
      if (section) {
        // Collect heading, paragraph/subheading, and button group
        const cellParts = [];
        // Heading (take all h1, h2, h3)
        Array.from(section.children).forEach((child) => {
          if (/^H[1-6]$/.test(child.tagName)) {
            cellParts.push(child);
          } else if (child.classList.contains('rich-text') || child.classList.contains('w-richtext')) {
            cellParts.push(child);
          } else if (child.classList.contains('button-group')) {
            cellParts.push(child);
          }
        });
        if (cellParts.length) {
          contentCell = cellParts;
        }
      }
    }
  }

  // Build the cells array as [header][bg image][content]
  const cells = [
    headerRow,
    [backgroundImg],
    [contentCell.length ? contentCell : ''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
