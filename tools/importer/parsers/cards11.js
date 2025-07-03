/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Get all top-level cards
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach(card => {
    // First cell: image (existing <img> element)
    let img = null;
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // Second cell: all text content (tag, heading, description, CTA)
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (contentDiv) {
      // Tag (optional)
      const tag = contentDiv.querySelector('.tag-group .tag');
      if (tag) textContent.push(tag);
      // Heading (optional: h1/h2/h3/h4)
      const heading = contentDiv.querySelector('h1, h2, h3, h4');
      if (heading) textContent.push(heading);
      // Description (optional)
      const desc = contentDiv.querySelector('p');
      if (desc) textContent.push(desc);
      // CTA/link (optional, not present in sample, but covered)
      // (Will not duplicate card link: only inner/secondary CTAs)
      const innerLink = contentDiv.querySelector('a');
      if (innerLink) textContent.push(innerLink);
    }
    // Add row: [image, textContent]
    rows.push([
      img,
      textContent
    ]);
  });

  // Create and replace with table (always reference existing nodes, never clone)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
