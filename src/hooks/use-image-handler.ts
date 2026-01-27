'use client';

import { useState } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

import { getCloudinarySignature } from '@/lib/cloudinary';

interface UseImageHandlerProps<T extends FieldValues> {
  mode: 'blog' | 'til';
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  setValue: UseFormSetValue<T>;
  content: string;
}

export function useImageHandler<T extends FieldValues>({
  mode,
  textareaRef,
  setValue,
  content,
}: UseImageHandlerProps<T>) {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const { signature, timestamp } = await getCloudinarySignature(mode);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', String(timestamp));
      formData.append('folder', mode);
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

  const handleImageUpload = async (files: File[]) => {
    const textarea = textareaRef.current;
    if (!textarea || files.length === 0) return;

    try {
      setIsUploading(true);

      const uploadPromises = files.map(async (file) => {
        const url = await uploadFile(file);
        return { url, fileName: file.name };
      });

      const results = await Promise.all(uploadPromises);
      const successfulImages = results.filter((img) => img.url !== null);
      if (successfulImages.length === 0) return;

      const imagesMarkdown = successfulImages
        .map((img) => `\n![${img.fileName}](${img.url})\n`)
        .join('');

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        content.substring(0, start) + imagesMarkdown + content.substring(end);

      setValue('content' as Path<T>, newContent as PathValue<T, Path<T>>, {
        shouldDirty: true,
      });

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
