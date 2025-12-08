import React, { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SingleImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
}

export const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  currentImage,
  onImageChange,
  label = "Main Image"
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image must be smaller than 5MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      onImageChange(publicUrl);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setUploadError(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = async () => {
    if (!currentImage) return;

    try {
      const fileName = currentImage.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('product-images')
          .remove([fileName]);
      }
      onImageChange('');
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-[#D7B387] text-black rounded-lg font-semibold hover:opacity-90 transition-colors cursor-pointer text-sm">
          <Upload className="h-4 w-4" />
          {uploading ? 'Uploading...' : `Upload ${label}`}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {uploading && <Loader className="h-5 w-5 animate-spin text-[#D7B387]" />}
      </div>

      {uploadError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-sm">{uploadError}</p>
        </div>
      )}

      {currentImage && (
        <div className="relative inline-block">
          <img
            src={currentImage}
            alt={label}
            className="w-32 h-32 object-cover rounded-lg border border-gray-600"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {!currentImage && (
        <p className="text-xs text-gray-400">
          Or enter URL manually below
        </p>
      )}
    </div>
  );
};
