import { useState, useCallback, useRef } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

interface MultiImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function MultiImageUpload({ images, onChange }: MultiImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
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

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length === 0) return;

    let processedCount = 0;
    const newImages: string[] = [];

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if too large
          const MAX_SIZE = 800;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          newImages.push(compressedBase64);
          processedCount++;

          if (processedCount === validFiles.length) {
            onChange([...images, ...newImages]);
            if (inputRef.current) inputRef.current.value = '';
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="w-full space-y-4">
      <div 
        className={`relative w-full min-h-[120px] border-2 border-dashed rounded-lg transition-all duration-200 flex flex-col items-center justify-center p-6 cursor-pointer
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'}`}
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
          multiple
          onChange={handleChange}
        />
        <div className="text-center space-y-2">
          <FaCloudUploadAlt className="text-3xl text-blue-500 mx-auto" />
          <div>
            <p className="text-sm font-medium text-gray-700">Click or drag additional images</p>
            <p className="text-xs text-gray-500 mt-1">Up to 800px width/height will be compressed</p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-video bg-gray-100 rounded-md overflow-hidden group border border-gray-200">
              <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <FaTimes size={12} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] items-center text-center py-0.5">
                pg_{i + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
