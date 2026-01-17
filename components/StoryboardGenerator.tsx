
import React, { useState } from 'react';
import { GeneratedResult, VideoStoryboard } from '../types';
import { UI_STRINGS, SWEET_STYLES } from '../constants';
import { generateVideoStoryboard } from '../services/geminiService';

interface StoryboardGeneratorProps {
  selectedResult: GeneratedResult;
}

const StoryboardGenerator: React.FC<StoryboardGeneratorProps> = ({ selectedResult }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyboard, setStoryboard] = useState<VideoStoryboard | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const startGeneration = async () => {
    setIsGenerating(true);
    try {
      const style = SWEET_STYLES.find(s => s.id === selectedResult.styleId);
      const result = await generateVideoStoryboard(style?.name || 'محل حلويات');
      setStoryboard(result);
    } catch (error) {
      console.error("Failed to generate storyboard", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="mt-20 pt-16 border-t border-orange-100 animate-fade-in pb-20">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">📝</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{UI_STRINGS.storyboardTitle}</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{UI_STRINGS.storyboardDesc}</p>
        
        {!storyboard && !isGenerating && (
          <button 
            onClick={startGeneration}
            className="mt-8 px-10 py-4 bg-orange-100 text-orange-700 rounded-2xl font-bold text-lg hover:bg-orange-200 transition shadow-sm border border-orange-200"
          >
            {UI_STRINGS.generateStoryboardBtn}
          </button>
        )}
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center py-12">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-6"></div>
          <p className="text-xl text-orange-600 font-medium">{UI_STRINGS.storyboardGenerating}</p>
        </div>
      )}

      {storyboard && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {storyboard.scenes.map((scene, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] border border-orange-50 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/4 bg-orange-50 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-l border-orange-100">
                <span className="text-sm font-bold text-orange-300 uppercase tracking-widest mb-1">{UI_STRINGS.sceneLabel}</span>
                <span className="text-5xl font-black text-orange-500 mb-4">0{scene.id || idx + 1}</span>
                <span className="bg-white px-4 py-1 rounded-full text-xs font-bold text-orange-400 shadow-sm">
                  ⏱️ {scene.duration}
                </span>
              </div>
              
              <div className="md:w-3/4 p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                      {UI_STRINGS.visualLabel}
                    </h4>
                    <button 
                      onClick={() => copyToClipboard(scene.visualDescription, `v-${idx}`)}
                      className="text-orange-500 text-xs font-bold hover:underline"
                    >
                      {copiedField === `v-${idx}` ? UI_STRINGS.captionCopied : UI_STRINGS.copyCaption}
                    </button>
                  </div>
                  <p className="text-gray-600 italic font-mono text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                    {scene.visualDescription}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-400 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                      {UI_STRINGS.voiceoverLabel}
                    </h4>
                    <button 
                      onClick={() => copyToClipboard(scene.voiceover, `a-${idx}`)}
                      className="text-orange-500 text-xs font-bold hover:underline"
                    >
                      {copiedField === `a-${idx}` ? UI_STRINGS.captionCopied : UI_STRINGS.copyCaption}
                    </button>
                  </div>
                  <p className="text-gray-800 text-lg font-medium leading-relaxed">
                    {scene.voiceover}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoryboardGenerator;
