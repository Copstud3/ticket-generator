"use client"

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import uploadIcon from "@/public/images/uploadicon.png";

interface ImageUploadProps {
  onImageUrl: (url: string) => void;
  maxSizeInMB?: number;
  required?: boolean;
}

type UploadError = {
  message: string;
  type: 'size' | 'format' | 'upload';
}

const ImageUpload = ({ onImageUrl, maxSizeInMB = 5, required = true }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState<UploadError | null>(null);

  const validateFile = (file: File): UploadError | null => {
    if (file.size > maxSizeInMB * 1024 * 1024) {
      return {
        type: 'size',
        message: `File size should be less than ${maxSizeInMB}MB`
      };
    }

    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validFormats.includes(file.type)) {
      return {
        type: 'format',
        message: 'Please upload a JPEG, JPG, or PNG file'
      };
    }

    return null;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setError(null);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      setPreviewUrl(data.secure_url);
      onImageUrl(data.secure_url);
    } catch (error) {
      console.error('Upload failed:', error);
      setError({
        type: 'upload',
        message: 'Failed to upload image. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  }, [onImageUrl, maxSizeInMB]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    disabled: uploading,
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl('');
    onImageUrl('');
    setError(null);
  };

  return (
    <div className="mt-8">
      <div
        {...getRootProps()}
        className={`
          flex flex-col items-center justify-center
          bg-[#041b20]
          cursor-pointer
          transition-all
          ${isDragActive ? 'border-white bg-[#0E464F]' : ''}
          ${uploading ? 'opacity-70 cursor-not-allowed' : ''}
          ${error ? 'border-red-500' : ''}
        `}
        aria-label="Image upload area"
        role="button"
        tabIndex={0}
      >
        <input {...getInputProps()} required={required} />

        {previewUrl ? (
          <div className="relative w-[240px] h-[240px]">
            <img
              src={previewUrl}
              alt="Preview"
              width={240}
              height={240}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-500 rounded-lg px-[5px] hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center gap-4 p-12 mx-32 bg-[#0e464f] rounded-[32px] max-sm:px-6 max-sm:mx-3 md:px-10 md:mx-4 xl:py-16 xl:mx-32'>
            <Image src={uploadIcon} alt='upload' />
            <p className="text-center text-white font-roboto">
              {uploading 
                ? 'Uploading...' 
                : isDragActive 
                  ? 'Drop the image here' 
                  : 'Drag & drop or click to upload *'}
            </p>
            <p className="text-sm text-gray-400">
              {`Supported formats: JPEG, PNG (max ${maxSizeInMB}MB)`}
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[#24A0B5] font-semibold font-roboto text-sm mt-2" role="alert">
          {error.message}
        </p>
      )}

      {uploading && (
        <div className="mt-2 text-center text-sm text-white" role="status">
          <span>Uploading your image...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;