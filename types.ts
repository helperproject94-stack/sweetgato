
export interface ImageStyle {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string;
}

export interface GeneratedResult {
  styleId: string;
  imageUrl: string;
}

export enum AppStep {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  RESULTS = 'results'
}

export interface SocialPlatform {
  id: string;
  name: string;
  width: number;
  height: number;
  icon: string;
}

export interface SocialContent {
  platformId: string;
  caption: string;
  imageUrl: string;
}

export interface MarketingAdvice {
  tip: string;
  hashtags: string;
  whatsappMessage: string;
}

// Added missing Storyboard types
export interface StoryboardScene {
  id: number;
  duration: string;
  visualDescription: string;
  voiceover: string;
}

export interface VideoStoryboard {
  scenes: StoryboardScene[];
}
