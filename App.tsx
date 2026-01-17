
import React, { useState, useCallback } from 'react';
import Layout from './components/Layout';
import UploadZone from './components/UploadZone';
import ProcessingState from './components/ProcessingState';
import ResultGallery from './components/ResultGallery';
import { AppStep, GeneratedResult } from './types';
import { fileToBase64, processSweetImage } from './services/geminiService';
import { SWEET_STYLES, UI_STRINGS } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.IDLE);
  const [results, setResults] = useState<GeneratedResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setError(null);
      // Set to UPLOADING while file is being processed locally
      setStep(AppStep.UPLOADING);
      
      const base64 = await fileToBase64(file);
      
      // Transition to PROCESSING state for the AI style generation (server calls)
      setStep(AppStep.PROCESSING);
      
      // We trigger multiple style generations in parallel for a faster UI experience
      // Note: We process them in chunks or all together depending on API limits
      const promises = SWEET_STYLES.map(style => processSweetImage(base64, style));
      
      const generatedResults = await Promise.all(promises);
      
      setResults(generatedResults);
      setStep(AppStep.RESULTS);
    } catch (err) {
      console.error(err);
      setError(UI_STRINGS.error);
      setStep(AppStep.IDLE);
    }
  };

  const handleReset = () => {
    setStep(AppStep.IDLE);
    setResults([]);
    setError(null);
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-center font-medium">
            {error}
          </div>
        )}

        {/* Fix: Allow UploadZone to be visible during UPLOADING state so the isLoading comparison is valid */}
        {(step === AppStep.IDLE || step === AppStep.UPLOADING) && (
          <UploadZone 
            onUpload={handleUpload} 
            isLoading={step === AppStep.UPLOADING} 
          />
        )}

        {step === AppStep.PROCESSING && (
          <ProcessingState />
        )}

        {step === AppStep.RESULTS && (
          <ResultGallery 
            results={results} 
            onReset={handleReset} 
          />
        )}
      </div>

      {/* Aesthetic decorative blobs */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-yellow-100/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
    </Layout>
  );
};

export default App;
