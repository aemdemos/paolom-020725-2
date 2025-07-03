/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match exactly
  const headerRow = ['Hero (hero23)'];

  // Find the image grid collage (all child imgs)
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let backgroundCell = '';
  if (grid) {
    // Gather all images into one wrapper
    const imgs = Array.from(grid.querySelectorAll('img'));
    if (imgs.length > 0) {
      const bgDiv = document.createElement('div');
      imgs.forEach(img => bgDiv.appendChild(img));
      backgroundCell = bgDiv;
    }
  }

  // Find the content area with heading, subheading, CTAs
  let contentCell = '';
  const contentRoot = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentRoot) {
    // Find container with actual text/buttons
    const container = contentRoot.querySelector('.container');
    if (container) {
      const contentDiv = document.createElement('div');
      // Heading (h1)
      const heading = container.querySelector('h1');
      if (heading) contentDiv.appendChild(heading);
      // Subheading (p.subheading)
      const subheading = container.querySelector('p.subheading');
      if (subheading) contentDiv.appendChild(subheading);
      // Buttons (within .button-group)
      const buttons = container.querySelector('.button-group');
      if (buttons) {
        Array.from(buttons.children).forEach(btn => contentDiv.appendChild(btn));
      }
      contentCell = contentDiv;
    }
  }

  // Compose the block table: 1 col x 3 rows
  const cells = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
