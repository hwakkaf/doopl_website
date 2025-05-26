import { html } from '@popeindustries/lit-html-server';

export const richText = (richText = []) => {
  const renderTextNode = (node) => {
    let content = node.text;

    if (node.bold) content = html`<strong>${content}</strong>`;
    if (node.italic) content = html`<em>${content}</em>`;
    if (node.underline) content = html`<u>${content}</u>`;

    return content;
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case 'paragraph':
        return html`<p>${block.children.map(renderTextNode)}</p>`;
      case 'heading':
        const level = block.level || 1;
        const Tag = `h${level}`;
        return html`<${Tag}>${block.children.map(renderTextNode)}</${Tag}>`;
      case 'quote':
        return html`<blockquote>${block.children.map(renderTextNode)}</blockquote>`;
      case 'list':
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        return html`<${ListTag}>
          ${block.children.map(item => html`<li>${item.children.map(renderTextNode)}</li>`)}
        </${ListTag}>`;
      default:
        return html``;
    }
  };

  return html`${richText.map(renderBlock)}`;
};
