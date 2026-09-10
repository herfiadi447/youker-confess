export const CONFESSION_CONFIG = {
  // Target & Sender names (dapat diubah kapan saja)
  SENDER_NAME: process.env.NEXT_PUBLIC_SENDER_NAME || 'Youker',
  TARGET_NAME: process.env.NEXT_PUBLIC_TARGET_NAME || 'Etri',
  
  // Isi pertanyaan utama
  QUESTION_TEXT: process.env.NEXT_PUBLIC_QUESTION_TEXT || 'Mau jadian?',

  // Subtext pengantar di Landing Page
  LANDING_SUBTEXT: 'Ada satu hal yang ingin aku tanyakan kepadamu...',
  
  // Slug URL unik secara acak yang tidak gampang ditebak (dapat di-override via env atau disesuaikan)
  UNIQUE_SLUG: process.env.NEXT_PUBLIC_UNIQUE_SLUG || 'v9k8-m3p2-x7z1',

  // Site URL
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://youker-confest.vercel.app',
};
