export function extractHeadings(content: string) {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  const slugCounts: Record<string, number> = {};

  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();

    let baseSlug = text
      .toLowerCase()
      .trim()
      .replace(/[\u2000-\u3300]|[\ud83c\ud83d\ud83e][\ud000-\udfff]/g, '')
      .replace(/[^\w\s\uAC00-\uD7A3-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    let finalSlug = baseSlug;
    if (slugCounts[baseSlug] !== undefined) {
      slugCounts[baseSlug]++;
      finalSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
    } else {
      slugCounts[baseSlug] = 0;
    }

    headings.push({ level, text, id: finalSlug });
  }
  return headings;
}
