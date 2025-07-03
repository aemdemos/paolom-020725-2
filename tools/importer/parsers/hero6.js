/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Hero (hero6)'];

  // --- Background image row ---
  // Find the background image: look for an img with class 'cover-image'
  let bgImg = element.querySelector('img.cover-image');
  let bgImgRow;
  if (bgImg) {
    bgImgRow = [bgImg];
  } else {
    bgImgRow = [''];
  }

  // --- Content row ---
  // Find the card with heading, subheading, and CTA(s)
  let contentCell = document.createElement('div');
  const card = element.querySelector('.card');
  if (card) {
    // Heading(s)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentCell.appendChild(heading);
    // Subheading
    const subheading = card.querySelector('.subheading');
    if (subheading) contentCell.appendChild(subheading);
    // Button group (may contain CTAs)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentCell.appendChild(buttonGroup);
  }
  const contentRow = [contentCell];

  // Compose block table as 1 column, 3 rows
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
