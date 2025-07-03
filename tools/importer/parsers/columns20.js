/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main content grid
  const grid = element.querySelector('.container > .w-layout-grid');
  if (!grid) return;
  
  // Get the grid's direct children
  const children = Array.from(grid.children);
  
  // Extract columns
  let leftCol = null;
  let contactList = null;
  let image = null;
  // The order is always: leftCol, contactList, image
  children.forEach(child => {
    if (child.tagName === 'DIV' && !leftCol) {
      leftCol = child;
    } else if (child.tagName === 'UL' && !contactList) {
      contactList = child;
    } else if (child.tagName === 'IMG' && !image) {
      image = child;
    }
  });
  
  // Left cell: all leftCol children (as nodes)
  const leftCell = leftCol ? Array.from(leftCol.childNodes) : [];
  // Right cell: contact list and image, stacked vertically
  const rightCell = [];
  if (contactList) rightCell.push(contactList);
  if (image) rightCell.push(image);
  
  // Compose the block table: header row (single column), then one row (two columns)
  const cells = [
    ['Columns (columns20)'],
    [leftCell, rightCell]
  ];
  
  // Create the table and replace the original section
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
