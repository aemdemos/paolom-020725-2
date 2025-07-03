/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for table
  const headerRow = ['Cards (cards36)'];
  // Get all card wrappers (immediate children)
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  // Each card row is: [image, empty string (since no text)]
  const rows = Array.from(cardDivs).map(div => {
    // Get the image element
    const img = div.querySelector('img');
    return [img, ''];
  });
  // Compose final table structure
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
