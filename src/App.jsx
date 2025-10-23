import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import "./i18n/i18n"; // Initialize i18n
import gradientBackground from "./assets/images/gradient-background.jpg";
import NavBar from "./components/NavBar/NavBar.jsx";
import HeroSection from "./components/HeroSection/HeroSection.jsx";
import CategoriesBar from "./components/Categories/CategoriesBar.jsx";
import { VideosByCategory } from "./components/Videos/VideosByCategory.jsx";
import LatestVideos from "./components/Videos/LatestVideos.jsx";
import LatestPicturesSlider from "./components/Pictures/LatestPicturesSlider.jsx";
import PictureDetailPage from "./components/Pictures/PictureDetailPage.jsx";
import FeaturedStories from "./components/Stories/FeaturedStories.jsx";
import ShortsStories from "./components/Stories/ShortsStories.jsx";
import CategoryPage from "./components/CategoryPage/CategoryPage.jsx";
import CategoryPageNew from "./components/CategoryPage/CategoryPageNew.jsx";
import VideoDetailPage from "./components/VideoDetail/VideoDetailPage.jsx";
import AboutPage from "./components/Pages/AboutPage.jsx";
import CoursesPage from "./components/Pages/CoursesPage.jsx";
import ShopPage from "./components/Pages/ShopPage.jsx";
import PicturesPage from "./components/Pages/PicturesPage.jsx";
import VideosPage from "./components/Pages/VideosPage.jsx";
import PictureCategoryPage from "./components/Pages/PictureCategoryPage.jsx";
import DrawingDetailPage from "./components/Pages/DrawingDetailPage.jsx";
import ImageDetailPage from "./components/Pinterest/ImageDetailPage.jsx";
import PrivacyPolicyPage from "./components/Pages/PrivacyPolicyPage.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import Footer from "./components/Footer/Footer.jsx";
import PinterestDebug from "./components/Debug/PinterestDebug.jsx";

// Component to track navigation changes
function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    console.log("🧭 Navigation changed to:", location.pathname, location.hash);
  }, [location]);

  return null;
}

function App() {
  const { i18n } = useTranslation();

  // Suppress YouTube iframe CORS errors globally
  useEffect(() => {
    const handleError = (event) => {
      // Suppress SecurityError from YouTube iframes (these are harmless)
      if (event.message && (
        event.message.includes('cross-origin') || 
        event.message.includes('SecurityError')
      )) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return true;
      }
    };
    
    window.addEventListener('error', handleError, true);
    return () => window.removeEventListener('error', handleError, true);
  }, []);

  // Set initial direction on app load
  useEffect(() => {
    const currentLang = i18n.language || 'en';
    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = currentLang;
    }
  }, [i18n.language]);

  return (
    <Router>
      <div 
        className="overflow-x-hidden min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `url(${gradientBackground})`
        }}
      >
        <NavigationTracker />
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                {/* Main content section */}
                <div>
                  <ErrorBoundary fallbackMessage="Unable to load latest videos. Please try refreshing the page.">
                    <LatestVideos />
                  </ErrorBoundary>
                  {/* Latest Pictures - Now visible on mobile with grid layout */}
                  <ErrorBoundary fallbackMessage="Unable to load latest pictures. Please try refreshing the page.">
                    <LatestPicturesSlider />
                  </ErrorBoundary>
                  
                  {/* View Categories Button - Mobile Only */}
                  <div className="md:hidden py-8 px-4 sm:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                      <a 
                        href="#/videos"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#59ACBE] text-white text-lg font-semibold rounded-xl hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        View Categories
                      </a>
                    </div>
                  </div>
                  
                  {/* Video Categories - Hidden on mobile */}
                  <div className="hidden md:block">
                    <ErrorBoundary fallbackMessage="Unable to load video categories. Please try refreshing the page.">
                      <VideosByCategory />
                    </ErrorBoundary>
                  </div>
                  {/* Add spacer to push footer down and ensure background extends */}
                  <div className="h-32"></div>
                </div>
              </>
            }
          />
          <Route path="/category/:id" element={<CategoryPageNew />} />
          <Route path="/category/:id/:type" element={<CategoryPageNew />} />
          <Route path="/video/:videoId" element={<VideoDetailPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/pictures" element={<PicturesPage />} />
          <Route
            path="/pictures/category/:categoryId"
            element={<PictureCategoryPage />}
          />
          <Route
            path="/pictures/image/:category/:imageId"
            element={<ImageDetailPage />}
          />
          <Route path="/pictures/detail/:id" element={<PictureDetailPage />} />
          <Route
            path="/pictures/drawing/:drawingId"
            element={<DrawingDetailPage />}
          />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/debug/pinterest" element={<PinterestDebug />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
