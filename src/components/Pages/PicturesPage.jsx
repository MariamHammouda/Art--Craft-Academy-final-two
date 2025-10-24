import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import PinterestEmbedGallery from '../Pinterest/PinterestEmbedGallery';
import PinterestRealWidget from '../Pinterest/PinterestRealWidget';
import ModalTest from '../Pinterest/ModalTest';

// Import fallback gallery images
import drawingImage from '../../assets/images/picture-gallary-images/drawing.jpg';
import origamiImage from '../../assets/images/picture-gallary-images/orgami.jpg';
import perlerBeadsImage from '../../assets/images/picture-gallary-images/perler-beads.jpg';
import clayImage from '../../assets/images/picture-gallary-images/clay.jpg';
import beadsAccessoriesImage from '../../assets/images/picture-gallary-images/beads-accessories.jpg';
import recyclingImage from '../../assets/images/picture-gallary-images/recycling.jpg';
import threeDPenImage from '../../assets/images/picture-gallary-images/3D-pen-letters.jpg';
import preschoolImage from '../../assets/images/picture-gallary-images/preschool.jpg';
import scienceImage from '../../assets/images/picture-gallary-images/science.png';

import picturesBackgroundImg from '../../assets/images/picture-gallary-images/pictures-backgrounds.jpg';

const PicturesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Translation function available:", typeof t);
    console.log("Navigate function available:", typeof navigate);
  }, [t, navigate]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/pictures/category/${categoryId}`);
  };

  // Add error handling for rendering
  try {
    return (
      <div className="min-h-screen">
        {/* Hero Header with Image */}
        <div className="relative">
        {/* Header Image */}
        <div className="h-80 w-full overflow-hidden relative">
          <img
            src={picturesBackgroundImg}
            alt={t('pictures.headerAlt')}
            className="w-full h-full object-cover scale-125 transform"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>
        
        {/* Header Content Over Image */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <div className="text-center px-6">
            {/* Content removed as requested */}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs />
        {/* Grid Layout */}
        
        
        
        {/* Real Pinterest Widgets Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('pictures.ourPinterestBoards')}
            </h2>
            {/* <p className="text-gray-600 max-w-2xl mx-auto">
              هذه هي Pinterest boards الحقيقية الخاصة بنا مع الصور الفعلية
            </p> */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-2 sm:px-4">
            {/* Category 1: Origami & Paper Crafts */}
            <PinterestRealWidget 
              key="origami-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/origami-paper-crafts/"
              title={t('pictures.categories.origamiPaperCrafts')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 2: Drawing */}
            <PinterestRealWidget 
              key="drawing-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/drawing/"
              title={t('pictures.categories.drawing')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 3: Recycling Art */}
            <PinterestRealWidget 
              key="recycling-art-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/recycling-art/"
              title={t('pictures.categories.recyclingArt')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 4: Beads & Accessories */}
            <PinterestRealWidget 
              key="beads-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/beads-accessories/"
              title={t('pictures.categories.beadsAccessories')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 5: Clay Creations */}
            <PinterestRealWidget 
              key="clay-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/clay-creations/"
              title={t('pictures.categories.clayCreations')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 6: Preschool Crafts */}
            <PinterestRealWidget 
              key="preschool-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/preschool-crafts/"
              title={t('pictures.categories.preschoolCrafts')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 7: Perler Beads */}
            <PinterestRealWidget 
              key="perler-beads-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/perler-beads/"
              title={t('pictures.categories.perlerBeads')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 8: 3D Pen Fun */}
            <PinterestRealWidget 
              key="3d-pen-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/3d-pen-fun/"
              title={t('pictures.categories.3dPenFun')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 9: Science & DIY Experiments */}
            <PinterestRealWidget 
              key="science-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/science-diy-experiments/"
              title={t('pictures.categories.scienceDiyExperiments')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 10: Miniature Wonders */}
            <PinterestRealWidget 
              key="miniature-board"
               boardUrl="https://www.pinterest.com/ArtCraftAcademy1/miniature-wonders/"
              
              title={t('pictures.categories.miniatureWonders')}
              width={800}
              height={500}
              cols={3}
            />
            
            {/* Category 11: Tips & Tricks */}
            <PinterestRealWidget 
              key="tips-board"
              boardUrl="https://www.pinterest.com/ArtCraftAcademy1/tips-tricks/"
              title={t('pictures.categories.tipsTricks')}
              width={800}
              height={500}
              cols={3}
            />
          </div>
        </div>
        
        {/* Pinterest Embed Gallery Section */}
        <div className="mt-16">
          <PinterestEmbedGallery />
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error("Error rendering PicturesPage:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('common.somethingWentWrong')}</h1>
          <p className="text-gray-600 mb-4">{t('common.errorLoadingPage')}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#59ACBE] text-white rounded-lg hover:bg-[#FCD11A] hover:text-[#59ACBE] transition-colors duration-200"
          >
            {t('common.backToHome')}
          </button>
        </div>
      </div>
    );
  }
};

export default PicturesPage;