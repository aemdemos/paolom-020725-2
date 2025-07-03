/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name exactly as in example
  const headerRow = ['Hero (hero37)'];

  // The example does not show a background image, so the second row is an empty string
  const backgroundRow = [''];

  // Find the grid container which has the main block content
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element.querySelector('[class*="grid"]');

  let contentDiv = null;
  let ctaLink = null;
  if (grid) {
    // Get all direct children of the grid
    const children = Array.from(grid.children);
    for (const child of children) {
      // The content block (heading + subheading)
      if (!contentDiv && child.querySelector('h1, h2, h3, h4, h5, h6')) contentDiv = child;
      // CTA button is a link
      if (!ctaLink && child.tagName === 'A') ctaLink = child;
    }
  }

  // Compose the main content: heading(s), subheading, CTA (in order)
  const mainContent = [];
  if (contentDiv) {
    // All children of the contentDiv (e.g. h2, p, etc), in order
    for (const node of Array.from(contentDiv.children)) {
      mainContent.push(node);
    }
  }
  if (ctaLink) {
    mainContent.push(ctaLink);
  }
  // If there's no content found, ensure at least an empty string so the cell is not missing
  const contentRow = [mainContent.length > 0 ? mainContent : ['']];

  // Compose the table
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
