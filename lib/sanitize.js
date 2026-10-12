const sanitizeHtml = require('sanitize-html');

// Post bodies are rendered with dangerouslySetInnerHTML, so everything the admin
// types is cleaned on the server before it reaches the database.
function cleanContent(html) {
  return sanitizeHtml(String(html || ''), {
    allowedTags: ['p', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li', 'br', 'hr', 'blockquote', 'img', 'figure', 'figcaption'],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesAppliedToAttributes: ['href', 'src'],
    allowProtocolRelative: false,
    // the editor leaves empty paragraphs behind (extra Enter presses); drop them, keep paragraphs that hold a picture
    exclusiveFilter: (frame) => frame.tag === 'p' && !frame.text.trim() && !frame.mediaChildren.length,
    transformTags: {
      a: (tagName, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href || '');
        return { tagName, attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs };
      },
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy' } }),
    },
  });
}

// Visible text of an HTML string (for empty checks and auto summaries)
function plainText(html) {
  return sanitizeHtml(String(html || ''), { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Gives every <img> without a description an alt text (used for pictures inserted in the editor)
function fillImageAlt(html, alt) {
  const safe = String(alt || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').slice(0, 150);
  if (!safe) return html;
  return String(html || '').replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\balt="[^"]+"/i.test(tag)) return tag;
    const cleaned = tag.replace(/\salt="[^"]*"/i, '');
    return cleaned.replace(/^<img/i, `<img alt="${safe}"`);
  });
}

module.exports = { cleanContent, plainText, fillImageAlt };
