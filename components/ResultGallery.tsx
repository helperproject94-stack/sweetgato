
import React, { useState } from 'react';
import { GeneratedResult, ImageStyle } from '../types';
import { SWEET_STYLES, UI_STRINGS } from '../constants';
import SocialContentEngine from './SocialContentEngine';
import MarketingAssistant from './MarketingAssistant';

interface ResultGalleryProps {
  results: GeneratedResult[];
  onReset: () => void;
}

const ResultGallery: React.FC<ResultGalleryProps> = ({ results, onReset }) => {
  const [selectedResult, setSelectedResult] = useState<GeneratedResult | null>(null);
  const [activeForSocial, setActiveForSocial] = useState<GeneratedResult | null>(null);
  const [activeForMarketing, setActiveForMarketing] = useState<GeneratedResult | null>(null);

  const getStyleById = (id: string): ImageStyle | undefined => {
    return SWEET_STYLES.find(s => s.id === id);
  };

  const downloadImage = (imageUrl: string, styleName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `sweetshot-${styleName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectForSocial = (result: GeneratedResult) => {
    setActiveForSocial(result);
    setActiveForMarketing(null);
    setTimeout(() => {
        document.getElementById('social-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectForMarketing = (result: GeneratedResult) => {
    setActiveForMarketing(result);
    setActiveForSocial(null);
    setTimeout(() => {
        document.getElementById('marketing-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{UI_STRINGS.resultsTitle}</h2>
          <p className="text-gray-500">تم توليد {results.length} خيارات احترافية لك</p>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-2 border border-orange-200 text-orange-600 rounded-full hover:bg-orange-50 transition"
        >
          {UI_STRINGS.startOver}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((result, idx) => {
          const style = getStyleById(result.styleId);
          const isActive = activeForSocial?.imageUrl === result.imageUrl || 
                           activeForMarketing?.imageUrl === result.imageUrl;
          
          return (
            <div 
              key={idx} 
              className={`bg-white rounded-3xl overflow-hidden border transition-all group flex flex-col ${isActive ? 'ring-4 ring-orange-400 border-transparent shadow-2xl' : 'border-orange-50 shadow-sm hover:shadow-xl'}`}
            >
              <div className="relative aspect-square overflow-hidden cursor-zoom-in" onClick={() => setSelectedResult(result)}>
                <img 
                  src={result.imageUrl} 
                  alt={style?.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-orange-600 shadow-sm">
                  {style?.icon} {style?.name}
                </div>
              </div>
              <div className="p-6 mt-auto space-y-3">
                <button 
                  onClick={() => downloadImage(result.imageUrl, style?.id || 'result')}
                  className="w-full py-3 bg-gray-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-900 active:scale-95 transition"
                >
                  📥 {UI_STRINGS.download}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => handleSelectForSocial(result)}
                    className={`py-3 rounded-xl font-bold transition text-xs ${activeForSocial?.imageUrl === result.imageUrl ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
                  >
                    📝 منشورات
                  </button>
                  <button 
                    onClick={() => handleSelectForMarketing(result)}
                    className={`py-3 rounded-xl font-bold transition text-xs ${activeForMarketing?.imageUrl === result.imageUrl ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                  >
                    🚀 نصائح بيع
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div id="social-section">
        {activeForSocial && <SocialContentEngine selectedResult={activeForSocial} />}
      </div>

      <div id="marketing-section">
        {activeForMarketing && <MarketingAssistant selectedResult={activeForMarketing} />}
      </div>

      {selectedResult && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10" onClick={() => setSelectedResult(null)}>
          <div className="relative max-w-4xl w-full max-h-full flex flex-col gap-4" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedResult.imageUrl} 
              className="w-full h-auto max-h-[80vh] rounded-3xl object-contain shadow-2xl" 
              alt="Preview"
            />
            <div className="flex justify-center gap-4">
               <button 
                onClick={() => downloadImage(selectedResult.imageUrl, selectedResult.styleId)}
                className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-xl"
              >
                تحميل الصورة
              </button>
              <button 
                onClick={() => setSelectedResult(null)}
                className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-lg"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultGallery;
