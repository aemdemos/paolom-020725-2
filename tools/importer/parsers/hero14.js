/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the background image: only the cover-image with utility-position-absolute
  let bgImg = null;
  const imgs = element.querySelectorAll('img');
  for (const img of imgs) {
    if (img.classList.contains('cover-image') && img.classList.contains('utility-position-absolute')) {
      bgImg = img;
      break;
    }
  }
  // If not found, leave blank for background image row
  const row2 = [bgImg ? bgImg : ''];

  // Row 3: main content, which is the card body (contains heading, features, cta, foreground image)
  let contentCell = '';
  // Try to get the card body (this contains all foreground content)
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    contentCell = cardBody;
  } else {
    // fallback: container with most content
    const mainContent = element.querySelector('.container');
    if (mainContent) {
      contentCell = mainContent;
    }
  }

  // Compose block table following the spec and example
  const cells = [
    ['Hero (hero14)'], // header row, exactly as required
    row2,
    [contentCell]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
