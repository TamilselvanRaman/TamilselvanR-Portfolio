import { useState, useCallback, useRef } from 'react';
import { FaCloudUploadAlt, FaImage, FaTimes } from 'react-icons/fa';

interface ImageUploadProps {
  currentImage?: string;
  onImageSelected: (file: File | null) => void;
}

export default function ImageUpload({ currentImage, onImageSelected }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageSelected(file);
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelected(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative w-full min-h-[200px] border-2 border-dashed rounded-lg transition-all duration-200 flex flex-col items-center justify-center p-6 cursor-pointer
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />

        {preview ? (
          <div className="relative w-full h-full flex items-center justify-center group">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-[300px] w-auto object-contain rounded-md shadow-sm"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
              <button 
                type="button"
                onClick={removeImage}
                className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Remove image"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Click or drop to replace
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-white p-4 rounded-full inline-block shadow-sm">
              <FaCloudUploadAlt className="text-4xl text-blue-500" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Click or drag image to upload
              </p>
              <p className="text-sm text-gray-500 mt-1">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
