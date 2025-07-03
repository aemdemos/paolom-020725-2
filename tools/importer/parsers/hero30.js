/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER ROW
  const headerRow = ['Hero (hero30)'];

  // IMAGE ROW: find first prominent background image
  let imageElem = null;
  // Find any <img> with a cover/hero class, or fallback to first img
  const img = element.querySelector('img.cover-image, img');
  if (img) imageElem = img;
  const imageRow = [imageElem ? imageElem : ''];

  // CONTENT ROW: find container with heading, subheading, CTA
  // Look for an immediate descendant .container
  let contentElems = [];
  const containers = Array.from(element.querySelectorAll(':scope > .w-layout-grid > div'));
  // Use the container with a heading as the content
  let textContainer = null;
  for (const cont of containers) {
    if (cont.querySelector('h1, h2, h3, h4, h5, h6')) {
      textContainer = cont.querySelector('.container') || cont;
      break;
    }
  }
  if (textContainer) {
    // Look for a single wrapper div (for margin).
    let wrapperDiv = textContainer.children.length === 1 && textContainer.children[0].tagName === 'DIV'
      ? textContainer.children[0]
      : textContainer;
    // Get all non-empty elements inside wrapper
    contentElems = Array.from(wrapperDiv.children).filter(el => {
      // Exclude empty button group
      if (el.classList && el.classList.contains('button-group') && el.children.length === 0) {
        return false;
      }
      // Allow everything else
      return true;
    });
  }
  const contentRow = [contentElems.length ? contentElems : ''];

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
