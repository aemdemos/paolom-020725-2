/* global WebImporter */
export default function parse(element, { document }) {
  // Utility: combine multiple elements into one div (if more than one)
  function combineElements(els) {
    if (!els.length) return '';
    if (els.length === 1) return els[0];
    const div = document.createElement('div');
    els.forEach(e => div.appendChild(e));
    return div;
  }

  const tableRows = [['Cards (cards2)']];

  // Locate the main grid wrapper
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // First card: large feature card (with image and tag)
  const firstCard = gridChildren.find(child => child.matches('a.utility-link-content-block'));
  if (firstCard) {
    // Image
    let img = null;
    const imgDiv = firstCard.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // Text content
    const textContent = [];
    const tagGroup = firstCard.querySelector('.tag-group');
    if (tagGroup) textContent.push(tagGroup);
    const heading = firstCard.querySelector('h3');
    if (heading) textContent.push(heading);
    const desc = firstCard.querySelector('p');
    if (desc) textContent.push(desc);
    tableRows.push([img, combineElements(textContent)]);
  }

  // Second group: middle column with two image cards (with tag)
  const vertStackDiv = gridChildren.find(child => child.classList.contains('flex-horizontal') && child.classList.contains('flex-vertical'));
  if (vertStackDiv) {
    // Only <a> cards here
    const vertCards = Array.from(vertStackDiv.querySelectorAll(':scope > a.utility-link-content-block'));
    vertCards.forEach(card => {
      // Image
      let img = null;
      const imgDiv = card.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
      if (imgDiv) {
        img = imgDiv.querySelector('img');
      }
      const textContent = [];
      const tagGroup = card.querySelector('.tag-group');
      if (tagGroup) textContent.push(tagGroup);
      const heading = card.querySelector('h3');
      if (heading) textContent.push(heading);
      const desc = card.querySelector('p');
      if (desc) textContent.push(desc);
      tableRows.push([img, combineElements(textContent)]);
    });
  }

  // Third group: rightmost stack of text-only cards (no images), separated by dividers
  const rightStackDiv = gridChildren.find(child => {
    // It must have several <a> siblings each separated by a .divider
    const links = child.querySelectorAll(':scope > a.utility-link-content-block');
    const dividers = child.querySelectorAll(':scope > .divider');
    return links.length > 0 && dividers.length >= 1;
  });
  if (rightStackDiv) {
    const rightCards = Array.from(rightStackDiv.querySelectorAll(':scope > a.utility-link-content-block'));
    rightCards.forEach(card => {
      // Text-only card: heading + description
      const textContent = [];
      const heading = card.querySelector('h3');
      if (heading) textContent.push(heading);
      const desc = card.querySelector('p');
      if (desc) textContent.push(desc);
      tableRows.push([ '', combineElements(textContent) ]);
    });
  }

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
