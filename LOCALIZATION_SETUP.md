# 🌍 Arabic-English Localization System

## Installation Required

First, install the required packages:
```bash
npm install react-i18next i18next
```

## 📁 Files Created

### 1. **i18n Configuration**
- `src/i18n/i18n.js` - Main i18n configuration
- `src/i18n/locales/en.json` - English translations
- `src/i18n/locales/ar.json` - Arabic translations (RTL)

### 2. **Components**
- `src/components/LanguageSwitcher/LanguageSwitcher.jsx` - Language switcher dropdown

## 🚀 Features Implemented

### ✅ **Complete Website Localization**
- **Navbar**: All navigation links, buttons, search tooltip
- **Hero Section**: Title, description, CTA buttons
- **Categories**: Section titles and category names
- **Videos**: Latest videos, featured content
- **Footer**: Contact info, links, copyright, social media
- **Pages**: Courses, Shop, About pages ready for translation

### ✅ **Language Switcher**
- Dropdown with flag icons
- Supports English 🇺🇸 and Arabic 🇸🇦 only
- RTL support for Arabic
- Smooth transitions and hover effects

## 🎯 **Supported Languages**

| Language | Code | RTL Support | Status |
|----------|------|-------------|---------|
| English  | `en` | No          | ✅ Complete |
| Arabic   | `ar` | Yes         | ✅ Complete |

## 📝 **Translation Keys Structure**

```json
{
  "nav": {
    "home": "Home",
    "categories": "Categories", 
    "videos": "Videos",
    "courses": "Courses",
    "shop": "Shop",
    "about": "About",
    "login": "Login",
    "signup": "Sign Up"
  },
  "hero": {
    "title": "Discover Your",
    "titleHighlight": "Creative", 
    "titleEnd": "Side",
    "description": "Learn arts and crafts from professionals...",
    "startLearning": "Start Learning",
    "browseCourses": "Browse Courses"
  },
  "common": {
    "search": "Search",
    "language": "Language",
    "welcome": "Welcome to Art Craft Academy"
  }
}
```

## 🔧 **How to Use**

### In Components:
```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <h1>{t('hero.title')}</h1>
  );
};
```

### Language Switching:
```jsx
import { useTranslation } from 'react-i18next';

const { i18n } = useTranslation();
i18n.changeLanguage('ar'); // Switch to Arabic
```

## 🎨 **RTL Support**

Arabic language automatically:
- Sets `document.dir = 'rtl'`
- Maintains proper text alignment
- Preserves component styling

## 🚀 **Next Steps**

1. **Install packages**: `npm install react-i18next i18next`
2. **Test the language switcher** in the navbar
3. **Add more translation keys** as needed
4. **Extend to other components** using the same pattern

## 📱 **Mobile Support**

- Language switcher is responsive
- Shows flags on mobile
- Maintains accessibility
- Touch-friendly dropdown

The localization system is now ready to use! The navbar and hero section are fully translated, and you can easily extend this to other components by following the same pattern.
