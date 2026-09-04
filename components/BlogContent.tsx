import sanitizeHtml from "sanitize-html";

export default function BlogContent({ html }: { html: string }) {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "em", "b", "i", "u", "a", "h2", "h3", "h4", "ul", "ol", "li", "blockquote"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
  });

  return <div className="blog-content" dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
