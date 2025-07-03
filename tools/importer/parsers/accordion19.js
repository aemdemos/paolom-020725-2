/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Create header row with correct block name exactly as in example
  const table = [['Accordion (accordion19)']];

  // 2. Find all accordion items directly under the element
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach(item => {
    // 3. Extract the title: look for .w-dropdown-toggle > .paragraph-lg (use .w-dropdown-toggle if .paragraph-lg missing)
    let titleEl = null;
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // 4. Extract the content element: .w-dropdown-list > .utility-padding-all-1rem > .rich-text if possible, fall back to .w-dropdown-list
    let contentEl = null;
    const dropdownList = item.querySelector(':scope > .w-dropdown-list');
    if (dropdownList) {
      const richText = dropdownList.querySelector('.rich-text');
      contentEl = richText || dropdownList;
    }

    // 5. Only push the row if both title and content exist
    if (titleEl && contentEl) {
      table.push([titleEl, contentEl]);
    }
  });

  // 6. Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
