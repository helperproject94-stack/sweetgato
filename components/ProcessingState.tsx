
import React, { useEffect, useState } from 'react';
import { UI_STRINGS } from '../constants';

const ProcessingState: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative w-32 h-32 mb-10">
        <div className="absolute inset-0 border-4 border-orange-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
          🍰
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        {UI_STRINGS.processingTitle}
      </h2>
      
      <div className="space-y-3 text-center">
        <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          {UI_STRINGS.removingBg}
        </p>
        <p className="text-lg text-orange-400 font-medium">
          {UI_STRINGS.generatingStyles}{dots}
        </p>
      </div>
      
      <div className="mt-12 p-6 bg-white rounded-2xl border border-orange-50 shadow-sm max-w-md">
        <p className="text-gray-400 text-sm italic">
          "{UI_STRINGS.waitMessage}"
        </p>
      </div>
    </div>
  );
};

export default ProcessingState;
