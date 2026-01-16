'use client';

import { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { getCloudinarySignature } from '@/app/blog/write/page.actions';
import { PostInput } from '@/schema/write';

interface UseImageHandlerProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  setValue: UseFormSetValue<PostInput>;
  content: string;
}

export function useImageHandler({
  textareaRef,
  setValue,
  content,
}: UseImageHandlerProps) {
  const [isUploading, setIsUploading] = useState(false);

  // ✅ 단일 파일 업로드를 수행하는 내부 함수
  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const { signature, timestamp } = await getCloudinarySignature();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', String(timestamp));
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData },
      );

      const data = await response.json();
      return data.secure_url || null;
    } catch (error) {
      console.error('Signed Upload Error:', error);
      return null;
    }
  };

  // ✅ 여러 파일을 병렬로 업로드하고 본문에 삽입하는 메인 로직
  const handleImageUpload = async (files: File[]) => {
    const textarea = textareaRef.current;
    if (!textarea || files.length === 0) return;

    try {
      setIsUploading(true);

      // 1. 모든 파일을 병렬로 Cloudinary에 전송
      const uploadPromises = files.map(async (file) => {
        const url = await uploadFile(file);
        return { url, fileName: file.name };
      });

      const results = await Promise.all(uploadPromises);

      // 2. 성공한 업로드 결과만 필터링
      const successfulImages = results.filter((img) => img.url !== null);
      if (successfulImages.length === 0) return;

      // 3. 마크다운 문자열 생성 (여러 장을 줄바꿈으로 구분)
      const imagesMarkdown = successfulImages
        .map((img) => `\n![${img.fileName}](${img.url})\n`)
        .join('');

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        content.substring(0, start) + imagesMarkdown + content.substring(end);

      setValue('content', newContent, { shouldDirty: true });

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + imagesMarkdown.length,
          start + imagesMarkdown.length,
        );
      }, 0);
    } finally {
      setIsUploading(false);
    }
  };

  return { handleImageUpload, isUploading };
}
