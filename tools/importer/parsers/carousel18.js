/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const slideDivs = Array.from(grid.children);
  const headerRow = ['Carousel (carousel18)'];
  const rows = slideDivs.map((slideDiv) => {
    // Extract the first img as the image cell
    const img = slideDiv.querySelector('img');
    // Try to find a text content element that might be paired with the image
    // Look for any siblings or children that aren't the image itself
    // We'll consider direct children except for the img's container
    let textCellContent = '';
    const imgParent = img?.parentElement;
    // Find any elements in slideDiv that are not the image or its parent hierarchy
    // (If image is wrapped, it's probably inside a container, the text is a sibling)
    // We'll collect all elements that are not the image or its containers and not a known layout/container class
    const excluded = new Set();
    if (img) {
      let curr = img;
      while (curr && curr !== slideDiv) {
        excluded.add(curr);
        curr = curr.parentElement;
      }
    }
    const possibleTextNodes = Array.from(slideDiv.children).filter(
      (child) => !excluded.has(child)
    );
    // If there are any text nodes or elements left, use them as content for the text cell
    if (possibleTextNodes.length > 0) {
      // If there's only one and it's not empty, use it; otherwise, combine them
      textCellContent = possibleTextNodes.length === 1 ? possibleTextNodes[0] : possibleTextNodes;
    } else {
      // Also check for text deeply nested except for the image container path
      // Only add if there's actual text content
      const textNodes = Array.from(slideDiv.querySelectorAll('*'))
        .filter(el => !excluded.has(el))
        .filter(el => el.textContent && el.textContent.trim().length > 0);
      if (textNodes.length > 0) {
        textCellContent = textNodes.length === 1 ? textNodes[0] : textNodes;
      } else {
        textCellContent = '';
      }
    }
    return [img, textCellContent];
  });
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
