# 🎨 Art & Craft Academy

> **Discover Your Creative Side** - A comprehensive online platform for learning arts and crafts

[![Live Website](https://img.shields.io/badge/🌐_Live_Website-artandcraftacademy.com-blue?style=for-the-badge)](http://www.artandcraftacademy.com)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![i18next](https://img.shields.io/badge/i18next-25.5.2-26A69A?style=flat&logo=i18next)](https://www.i18next.com/)

## 🌟 Live Demo

**🔗 Visit the website:** [www.artandcraftacademy.com](http://www.artandcraftacademy.com)

## 📖 About

Art & Craft Academy is a modern, bilingual educational platform designed to teach arts and crafts to learners of all ages. The platform features comprehensive tutorials, interactive galleries, and real Pinterest integration for craft inspiration.

### ✨ Key Features

- 🎥 **Video Tutorial System** - Organized by categories with detailed pages
- 🖼️ **Interactive Picture Galleries** - Craft project showcases
- 📌 **Pinterest Integration** - Real Pinterest widgets for inspiration
- 🌍 **Bilingual Support** - English & Arabic with RTL layout
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Hero Image Slider** - Beautiful craft showcase
- 🔍 **Advanced Search** - Find content easily
- 📊 **SEO Optimized** - Better search engine visibility

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Latest React with modern features
- **Vite 7.1.6** - Lightning-fast build tool
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **React Router DOM 7.9.2** - Client-side routing

### Internationalization
- **i18next 25.5.2** - Internationalization framework
- **react-i18next 16.0.0** - React integration for i18n
- **RTL Support** - Right-to-left layout for Arabic

### UI & Icons
- **Lucide React 0.544.0** - Beautiful icons
- **React Icons 5.5.0** - Icon library
- **React Helmet Async 2.0.4** - SEO meta management

### Development Tools
- **ESLint 9.35.0** - Code linting
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - CSS vendor prefixes

## 🏗️ Project Structure

```
src/
├── 🧩 components/          # 20 component folders (56+ files)
│   ├── NavBar/            # Navigation with language switcher
│   ├── HeroImage/         # Hero slider with 6 images
│   ├── Videos/            # Video tutorial system (6 files)
│   ├── Pictures/          # Image gallery system (4 files)
│   ├── Pinterest/         # Pinterest integration (12 files)
│   ├── Pages/             # Page components (8 files)
│   └── ...                # Other UI components
├── 🔧 services/           # API integration (6 files)
│   ├── youtubeApi.js      # YouTube integration
│   ├── pinterestApi.js    # Pinterest API wrapper
│   └── cacheManager.js    # Performance caching
├── 🎣 hooks/              # Custom React hooks (3 files)
├── 🌍 i18n/               # Internationalization
├── 📊 mockData/           # Development data (5 files)
└── 🖼️ assets/             # Images and static files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/art-craft-academy-project.git
   cd art-craft-academy-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your API keys for Pinterest and YouTube
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌍 Internationalization

The platform supports:
- **English** (Default)
- **Arabic** with RTL layout support

### Adding New Languages
1. Create translation file in `src/i18n/locales/`
2. Update `src/i18n/i18n.js` configuration
3. Add language option to `LanguageSwitcher` component

## 📊 SEO & Performance

- ✅ **SEO Optimized** - Meta tags, structured data
- ✅ **Performance** - Lazy loading, code splitting
- ✅ **Caching** - Smart caching strategy
- ✅ **Security Headers** - XSS protection, CSRF prevention
- ✅ **Mobile Optimized** - Responsive design

## 🎯 Key Components

### Pinterest Integration
- Real Pinterest widgets
- Proxy API for rate limiting
- Image galleries with modal views
- Pinterest board embedding

### Video System
- YouTube API integration
- Category-based organization
- Video detail pages
- Latest videos showcase

### Multilingual Support
- Complete Arabic translation
- RTL layout support
- Language switcher in navbar
- Localized content

## 🚀 Deployment

The project is deployed on **Netlify** with:
- Automatic builds from main branch
- Environment variable management
- Custom domain configuration
- Performance optimizations

**Live URL:** [www.artandcraftacademy.com](http://www.artandcraftacademy.com)

## 📈 Features Roadmap

- [ ] User authentication system
- [ ] Course enrollment functionality
- [ ] Interactive craft tutorials
- [ ] Community features
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer** - Full-stack development and architecture
- **Designer** - UI/UX design and user experience
- **Content Creator** - Educational content and tutorials

## 📞 Contact

- **Website:** [www.artandcraftacademy.com](http://www.artandcraftacademy.com)
- **Email:** contact@artandcraftacademy.com
- **GitHub:** [Project Repository](https://github.com/yourusername/art-craft-academy-project)

---

<div align="center">
  <strong>🎨 Made with ❤️ for the creative community</strong>
</div>
