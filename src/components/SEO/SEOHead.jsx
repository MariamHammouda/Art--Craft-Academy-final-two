import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image = '/og-image.jpg',
  url,
  type = 'website',
  noIndex = false 
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === 'ar';
  
  // Default values
  const defaultTitle = isArabic 
    ? 'أكاديمية الفنون والحرف | تعلم الرسم والأشغال اليدوية أونلاين'
    : 'Art & Craft Academy | Learn Drawing and Handmade Crafts Online';
    
  const defaultDescription = isArabic
    ? 'تعلم الفنون والحرف اليدوية مع أكاديمية الفنون والحرف. كورسات أونلاين في الرسم، النحت، الأوريجامي، والتصميم. ابدأ رحلتك الإبداعية اليوم مجاناً!'
    : 'Learn arts and crafts with Art & Craft Academy. Online courses in drawing, sculpture, origami, and design. Start your creative journey today for free!';

  const defaultKeywords = isArabic
    ? 'تعليم رسم, كورسات حرف يدوية, تعلم اوريجامي, دروس رسم مجانية, اشغال يدوية, تعليم نحت'
    : 'art courses, craft academy, online learning, drawing lessons, handmade crafts, origami tutorials';

  const siteUrl = 'https://artcraftacademy.netlify.app';
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} dir={isArabic ? 'rtl' : 'ltr'} />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Art & Craft Academy" />
      <meta property="og:locale" content={isArabic ? 'ar_EG' : 'en_US'} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:url" content={fullUrl} />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="ar" href={`${fullUrl}?lang=ar`} />
      <link rel="alternate" hrefLang="en" href={`${fullUrl}?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Helmet>
  );
};

export default SEOHead;
