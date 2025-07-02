/* global WebImporter */
export default function parse(element, { document }) {
  // Table rows - first row is always the block/component name as header
  const rows = [['Accordion']];

  // Get all immediate accordion items (direct children with .accordion)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title: usually in .w-dropdown-toggle > .paragraph-lg
    let titleCell = item.querySelector('.w-dropdown-toggle .paragraph-lg');
    if (!titleCell) {
      // fallback: the toggle itself
      titleCell = item.querySelector('.w-dropdown-toggle');
    }
    // Content: .accordion-content .w-richtext (rich text)
    let contentCell = item.querySelector('.accordion-content .w-richtext');
    if (!contentCell) {
      // fallback: the accordion-content itself
      contentCell = item.querySelector('.accordion-content');
    }
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create the accordion table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
