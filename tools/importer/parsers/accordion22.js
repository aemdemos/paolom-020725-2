/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as specified
  const headerRow = ['Accordion (accordion22)'];

  // Collect all top-level accordion items (should be direct children with class 'divider')
  const accordionItems = Array.from(element.querySelectorAll(':scope > div'));

  // Build the rows
  const rows = [headerRow];
  accordionItems.forEach((divider) => {
    // Within each divider, get the .w-layout-grid which contains title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    const gridChildren = Array.from(grid.children).filter(Boolean);
    if (gridChildren.length < 2) return;
    // Reference the existing elements directly (do not clone)
    const title = gridChildren[0];
    const content = gridChildren[1];
    rows.push([title, content]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block
  element.replaceWith(block);
}
