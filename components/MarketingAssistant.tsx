
import React, { useState } from 'react';
import { GeneratedResult, MarketingAdvice } from '../types';
import { UI_STRINGS, SWEET_STYLES } from '../constants';
import { generateMarketingAdvice } from '../services/geminiService';

interface MarketingAssistantProps {
  selectedResult: GeneratedResult;
}

const MarketingAssistant: React.FC<MarketingAssistantProps> = ({ selectedResult }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [advice, setAdvice] = useState<MarketingAdvice | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const startAnalysis = async () => {
    setIsGenerating(true);
    try {
      const style = SWEET_STYLES.find(s => s.id === selectedResult.styleId);
      const result = await generateMarketingAdvice(style?.name || 'محل حلويات');
      setAdvice(result);
    } catch (error) {
      console.error("Failed to generate advice", error);
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
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">🚀</div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{UI_STRINGS.marketingTitle}</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">{UI_STRINGS.marketingDesc}</p>
        
        {!advice && !isGenerating && (
          <button 
            onClick={startAnalysis}
            className="mt-8 px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-xl"
          >
            {UI_STRINGS.generateMarketingBtn}
          </button>
        )}
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center py-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-6"></div>
          <p className="text-xl text-blue-600 font-medium">{UI_STRINGS.marketingGenerating}</p>
        </div>
      )}

      {advice && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Tip Card */}
          <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm space-y-4">
            <h4 className="font-bold text-blue-600 flex items-center gap-2">
              <span>{UI_STRINGS.tipLabel}</span>
            </h4>
            <p className="text-gray-700 leading-relaxed italic">{advice.tip}</p>
          </div>

          {/* Hashtags Card */}
          <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-blue-600">{UI_STRINGS.hashtagsLabel}</h4>
              <button 
                onClick={() => copyToClipboard(advice.hashtags, 'hashtags')}
                className="text-xs bg-blue-50 text-blue-500 px-3 py-1 rounded-full font-bold"
              >
                {copiedField === 'hashtags' ? UI_STRINGS.captionCopied : UI_STRINGS.copyCaption}
              </button>
            </div>
            <p className="text-blue-500 font-medium text-sm leading-relaxed">{advice.hashtags}</p>
          </div>

          {/* WhatsApp Message Card */}
          <div className="bg-green-50 p-6 rounded-3xl border border-green-100 shadow-sm space-y-4">
             <div className="flex justify-between items-center">
              <h4 className="font-bold text-green-600">{UI_STRINGS.whatsappLabel}</h4>
              <button 
                onClick={() => copyToClipboard(advice.whatsappMessage, 'whatsapp')}
                className="text-xs bg-white text-green-500 px-3 py-1 rounded-full font-bold shadow-sm"
              >
                {copiedField === 'whatsapp' ? UI_STRINGS.captionCopied : UI_STRINGS.copyCaption}
              </button>
            </div>
            <p className="text-green-800 font-medium leading-relaxed bg-white/50 p-4 rounded-xl border border-green-100">
              {advice.whatsappMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingAssistant;
