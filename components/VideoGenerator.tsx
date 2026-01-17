
import React, { useState, useEffect, useRef } from 'react';
import { GeneratedResult } from '../types';
import { UI_STRINGS } from '../constants';
import { generatePromoVideo, generatePromoAudio } from '../services/geminiService';

interface VideoGeneratorProps {
  selectedResult: GeneratedResult;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ selectedResult }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [waitingMsgIdx, setWaitingMsgIdx] = useState(0);
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    checkKey();
    const interval = setInterval(() => {
      setWaitingMsgIdx(prev => (prev + 1) % UI_STRINGS.videoWaitingMsgs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const checkKey = async () => {
    if ((window as any).aistudio?.hasSelectedApiKey) {
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleOpenSelectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const startGeneration = async () => {
    setIsGenerating(true);
    setVideoUrl(null);
    setAudioUrl(null);
    
    try {
      const promoText = "حلوى فاخرة بطعم لا يُنسى، صنعت خصيصاً لتناسب ذوقكم الرفيع. اطلبوا الآن وعيشوا تجربة من السعادة الحقيقية";
      
      const [vUrl, aUrl] = await Promise.all([
        generatePromoVideo(selectedResult.imageUrl),
        generatePromoAudio(promoText)
      ]);
      
      setVideoUrl(vUrl);
      setAudioUrl(aUrl);
    } catch (error: any) {
      console.error("Generation failed", error);
      if (error.message?.includes("Requested entity was not found")) {
          setHasKey(false);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const playPreview = () => {
    if (videoRef.current && audioRef.current) {
        videoRef.current.currentTime = 0;
        audioRef.current.currentTime = 0;
        videoRef.current.play();
        audioRef.current.play();
    }
  };

  if (hasKey === false) {
    return (
      <div className="mt-16 p-10 bg-white rounded-3xl border border-orange-100 text-center shadow-lg">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">🔑</div>
        <h2 className="text-2xl font-bold mb-3">{UI_STRINGS.selectKeyTitle}</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{UI_STRINGS.selectKeyDesc}</p>
        <button 
          onClick={handleOpenSelectKey}
          className="px-10 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition shadow-md"
        >
          {UI_STRINGS.selectKeyBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 pt-16 border-t border-orange-100 animate-fade-in pb-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">{UI_STRINGS.videoSectionTitle}</h2>
        <p className="text-gray-500 text-lg">{UI_STRINGS.videoSectionDesc}</p>
        
        {!videoUrl && !isGenerating && (
          <button 
            onClick={startGeneration}
            className="mt-8 px-12 py-4 bg-orange-600 text-white rounded-2xl font-bold text-xl hover:bg-orange-700 transition shadow-xl flex items-center gap-3 mx-auto"
          >
            🎬 {UI_STRINGS.generateVideoBtn}
          </button>
        )}
      </div>

      {isGenerating && (
        <div className="flex flex-col items-center py-20 bg-white rounded-3xl border border-orange-50 shadow-inner">
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-2xl text-gray-800 font-bold mb-3">{UI_STRINGS.videoGenerating}</p>
          <p className="text-orange-500 text-lg animate-pulse font-medium">
            {UI_STRINGS.videoWaitingMsgs[waitingMsgIdx]}
          </p>
        </div>
      )}

      {videoUrl && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden shadow-2xl mx-auto w-full max-w-[340px] border-[10px] border-gray-900">
            <video 
              ref={videoRef}
              src={videoUrl} 
              className="w-full h-full object-cover" 
              loop 
              playsInline
            />
            {audioUrl && <audio ref={audioRef} src={audioUrl} loop className="hidden" />}
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer" onClick={playPreview}>
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-4xl hover:bg-white/40 transition">▶️</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
               <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">✨</div>
                  <h3 className="text-2xl font-bold text-green-800">{UI_STRINGS.videoReady}</h3>
               </div>
               <p className="text-green-700 text-lg leading-relaxed">فيديو السوشيال ميديا جاهز! تم دمج التحريك السينمائي والتعليق الصوتي الاحترافي لزيادة جاذبية منتجاتك.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <a 
                href={videoUrl} 
                download="sweetshot-promo.mp4"
                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-xl text-center flex items-center justify-center gap-3 hover:bg-black transition shadow-lg"
              >
                📥 {UI_STRINGS.downloadVideo}
              </a>
              {audioUrl && (
                 <a 
                  href={audioUrl} 
                  download="sweetshot-voiceover.wav"
                  className="w-full py-4 border-2 border-orange-100 text-orange-600 rounded-2xl font-bold text-lg text-center hover:bg-orange-50 transition"
                >
                  تحميل الصوت فقط
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
