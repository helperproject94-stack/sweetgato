
import { ImageStyle, SocialPlatform } from './types';

export const APP_NAME = "SweetShot — ستديو الحلويات";

export const SWEET_STYLES: ImageStyle[] = [
  {
    id: 'luxury',
    name: 'محل حلويات فاخر',
    description: 'خلفية متجر حلويات راقٍ بإضاءة ذهبية',
    prompt: 'luxury high-end pastry shop background with warm golden lighting, bokeh, professional food photography',
    icon: '✨'
  },
  {
    id: 'minimal',
    name: 'ستديو عصري بسيط',
    description: 'خلفية نظيفة وبسيطة بأسلوب الاستديو',
    prompt: 'clean minimal studio background, soft shadows, neutral colors, high-end product photography',
    icon: '🏢'
  },
  {
    id: 'marble',
    name: 'طاولة رخامية',
    description: 'طاولة رخام بيضاء أنيقة مع إضاءة طبيعية',
    prompt: 'elegant white marble table top background, natural morning sunlight, high-end cafe vibes',
    icon: '🏛️'
  },
  {
    id: 'bakery',
    name: 'ركن المخبز',
    description: 'خلفية ريفية دافئة لمخبز خشبي',
    prompt: 'warm rustic bakery counter background, wooden textures, cozy atmosphere, bakery setting',
    icon: '🥖'
  },
  {
    id: 'vintage',
    name: 'مخبز كلاسيكي',
    description: 'خلفية مخبز كلاسيكي بلمسة ريترو قديمة',
    prompt: 'vintage classic bakery background, 1950s aesthetic, retro tiles, antique kitchenware, warm film grain, soft morning light, professional food photography',
    icon: '🕰️'
  },
  {
    id: 'pastel',
    name: 'ألوان باستيل ناعمة',
    description: 'خلفية ناعمة بألوان وردية وسماوية',
    prompt: 'soft pastel color background, dreamlike aesthetic, gentle lighting, playful and sweet',
    icon: '🌸'
  },
  {
    id: 'dark',
    name: 'ثيم الشوكولاتة الداكنة',
    description: 'خلفية داكنة غامضة وفخمة',
    prompt: 'dark moody premium chocolate theme background, low key lighting, dramatic shadows, sophisticated',
    icon: '🍫'
  },
  {
    id: 'instagram',
    name: 'ستايل إنستغرام',
    description: 'خلفية جذابة وملونة مناسبة للنشر',
    prompt: 'trendy instagram style flat lay background, vibrant colors, aesthetic cafe decoration',
    icon: '📸'
  },
  {
    id: 'ecommerce',
    name: 'متجر إلكتروني',
    description: 'خلفية احترافية للمواقع التجارية',
    prompt: 'professional e-commerce white background with soft reflection, clean and commercial',
    icon: '🛒'
  }
];

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { id: 'insta_post', name: 'إنستغرام (منشور)', width: 1080, height: 1080, icon: '📸' },
  { id: 'insta_story', name: 'إنستغرام (ستوري)', width: 1080, height: 1920, icon: '📱' },
  { id: 'facebook', name: 'فيسبوك', width: 1200, height: 630, icon: '👥' },
  { id: 'tiktok', name: 'تيك توك', width: 1080, height: 1920, icon: '🎵' },
  { id: 'snapchat', name: 'سناب شات', width: 1080, height: 1920, icon: '👻' },
];

export const UI_STRINGS = {
  uploadTitle: "ارفع صورة قطعة الحلوى",
  uploadDesc: "حول صور حلوياتك العادية إلى صور احترافية بضغطة زر واحدة",
  uploadButton: "رفع صورة",
  processingTitle: "جاري معالجة الصورة...",
  removingBg: "يتم الآن إزالة الخلفية وتحليل المنتج",
  generatingStyles: "يتم إنشاء الخلفيات الاحترافية لمنتجك",
  resultsTitle: "اختر التصميم الذي يعجبك",
  download: "تحميل الصورة",
  startOver: "البدء من جديد",
  error: "حدث خطأ ما، يرجى المحاولة مرة أخرى",
  waitMessage: "يرجى الانتظار، نحن نستخدم أحدث تقنيات الذكاء الاصطناعي",
  socialTitle: "منشورات السوشيال ميديا الجاهزة",
  socialDesc: "محتوى مخصص باللهجة الجزائرية لجذب الزبائن",
  generatingSocial: "يتم إنشاء المنشورات بالدارجة...",
  socialReady: "المحتوى جاهز للنشر",
  generateSocialBtn: "إنشاء المنشورات",
  downloadAll: "تحميل كل شيء",
  copyCaption: "نسخ النص",
  captionCopied: "تم النسخ!",
  
  // Marketing Assistant Strings
  marketingTitle: "مساعد التسويق الذكي",
  marketingDesc: "نصائح استراتيجية ووسوم قوية لزيادة مبيعاتك في الجزائر",
  generateMarketingBtn: "تحليل استراتيجية البيع",
  marketingGenerating: "جاري تحليل السوق والمنافسين...",
  marketingReady: "خطتك التسويقية جاهزة",
  tipLabel: "💡 نصيحة للبيع:",
  hashtagsLabel: "🏷️ وسوم مقترحة (Hashtags):",
  whatsappLabel: "📱 رسالة طلب واتساب جاهزة:",

  // Video Generation Strings
  videoSectionTitle: "إنشاء فيديو ترويجي",
  videoSectionDesc: "حول الصورة إلى فيديو سينمائي قصير مع تعليق صوتي",
  generateVideoBtn: "إنشاء الفيديو",
  videoGenerating: "جاري إنشاء الفيديو والتعليق الصوتي...",
  videoWaitingMsgs: [
    "يتم الآن تحريك الصورة بلمسات فنية...",
    "جاري توليد التعليق الصوتي بالذكاء الاصطناعي...",
    "نقوم بضبط الإضاءة والحركة لجعل الفيديو أكثر جاذبية...",
    "لحظات قليلة وسيكون منتجك جاهزاً للعرض العالمي..."
  ],
  videoReady: "الفيديو جاهز للعرض!",
  downloadVideo: "تحميل الفيديو",
  selectKeyTitle: "مطلوب مفتاح API خاص",
  selectKeyDesc: "لإنشاء الفيديوهات، يرجى اختيار مفتاح API مفعل عليه الدفع (Billing)",
  selectKeyBtn: "اختيار مفتاح API",

  // Storyboard Strings
  storyboardTitle: "مخطط الفيديو (Storyboard)",
  storyboardDesc: "اقتراح لمشاهد فيديو إعلاني احترافي لمنتجك",
  generateStoryboardBtn: "إنشاء المخطط",
  storyboardGenerating: "جاري كتابة سيناريو الإعلان...",
  sceneLabel: "المشهد",
  visualLabel: "الوصف البصري",
  voiceoverLabel: "التعليق الصوتي",
};
