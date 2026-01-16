export function extractHeadings(content: string) {
  // 1. 코드 블록 내부의 내용을 제거하여 오탐 방지
  const cleanContent = content.replace(/```[\s\S]*?```/g, '');

  // 2. 제목(#, ##, ###) 추출
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(cleanContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // fumadocs나 rehype-slug가 생성하는 id 규칙에 맞춰 slug 생성 (또는 content 기반)
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣-]/g, '');

    headings.push({ id, text, level });
  }

  return headings;
}
