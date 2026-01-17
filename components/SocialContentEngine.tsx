
import React, { useState, useEffect } from 'react';
import { GeneratedResult, SocialContent } from '../types';
import { SOCIAL_PLATFORMS, UI_STRINGS, SWEET_STYLES } from '../constants';
import { generateSocialCaptions, resizeAndCropImage } from '../services/geminiService';

interface SocialContentEngineProps {
  selectedResult: GeneratedResult;
}

const SocialContentEngine: React.FC<SocialContentEngineProps> = ({ selectedResult }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [socialResults, setSocialResults] = useState<SocialContent[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const style = SWEET_STYLES.find(s => s.id === selectedResult.styleId);
      const captions = await generateSocialCaptions(style?.name || 'محل حلويات');
      
      const contents: SocialContent[] = await Promise.all(
        SOCIAL_PLATFORMS.map(async (platform) => {
          const resizedUrl = await resizeAndCropImage(
            selectedResult.imageUrl, 
            platform.width, 
            platform.height
          );
          return {
            platformId: platform.id,
            caption: captions[platform.id] || '',
            imageUrl: resizedUrl
          };
        })
      );

      setSocialResults(contents);
    } catch (error) {
      console.error("Failed to generate social content", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadImage = (url: string, platformName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `sweetshot-${platformName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-20 pt-16 border-t border-orange-100 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{UI_STRINGS.socialTitle}</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{UI_STRINGS.socialDesc}</p>
        
        {socialResults.length === 0 && !isGenerating && (
          <button 
            onClick={generateContent}
            className="mt-8 px-10 py-4 bg-gray-800 text-white rounded-2xl font-bold text-lg hover:bg-black transition shadow-xl"
          >
            {UI_STRINGS.generateSocialBtn}
          </button>
        )}
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center py-12">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-6"></div>
          <p className="text-xl text-orange-600 font-medium">{UI_STRINGS.generatingSocial}</p>
        </div>
      )}

      {socialResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {socialResults.map((item) => {
            const platform = SOCIAL_PLATFORMS.find(p => p.id === item.platformId);
            return (
              <div key={item.platformId} className="bg-white rounded-3xl overflow-hidden border border-orange-50 shadow-sm flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 relative aspect-[3/4] bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img src={item.imageUrl} className="w-full h-full object-cover" alt={platform?.name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                    {platform?.icon} {platform?.name}
                  </div>
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Caption / النص</span>
                      <button 
                        onClick={() => handleCopy(item.caption, item.platformId)}
                        className="text-orange-500 text-sm font-bold hover:underline"
                      >
                        {copiedId === item.platformId ? UI_STRINGS.captionCopied : UI_STRINGS.copyCaption}
                      </button>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap italic">
                      {item.caption}
                    </p>
                  </div>
                  <button 
                    onClick={() => downloadImage(item.imageUrl, platform?.id || 'post')}
                    className="mt-6 w-full py-3 border-2 border-orange-100 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    {UI_STRINGS.download}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SocialContentEngine;
