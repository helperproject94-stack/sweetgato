
import React, { useRef } from 'react';
import { UI_STRINGS } from '../constants';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUpload, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        onClick={handleClick}
        className={`relative overflow-hidden group border-4 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer
          ${isLoading ? 'border-orange-200 bg-orange-50 opacity-60 pointer-events-none' : 'border-orange-100 bg-white hover:border-orange-300 hover:bg-orange-50'}`}
      >
        <div className="space-y-6">
          <div className="w-24 h-24 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
            🥧
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{UI_STRINGS.uploadTitle}</h2>
            <p className="text-gray-500 text-lg">{UI_STRINGS.uploadDesc}</p>
          </div>
          <button 
            className="px-8 py-3 bg-orange-500 text-white rounded-full text-lg font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95 transition"
            disabled={isLoading}
          >
            {UI_STRINGS.uploadButton}
          </button>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/png,image/jpeg,image/webp" 
          className="hidden" 
        />
      </div>
      
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
        {[1, 2, 3, 4].map(i => (
          <img 
            key={i}
            src={`https://picsum.photos/seed/sweet${i}/200/200`} 
            alt="Sample" 
            className="rounded-xl aspect-square object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default UploadZone;
