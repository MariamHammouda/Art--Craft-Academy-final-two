// Import picture gallery images
import origamiImg from "../assets/images/picture-gallary-images/orgami.jpg";
import drawingImg from "../assets/images/picture-gallary-images/drawing.jpg";
import recyclingImg from "../assets/images/picture-gallary-images/recycling.jpg";
import beadsImg from "../assets/images/picture-gallary-images/beads-accessories.jpg";
import clayImg from "../assets/images/picture-gallary-images/clay.jpg";
import preschoolImg from "../assets/images/picture-gallary-images/preschool.jpg";
import perlerBeadsImg from "../assets/images/picture-gallary-images/perler-beads.jpg";
import threeDPenImg from "../assets/images/picture-gallary-images/3D-pen-letters.jpg";
import miniatureImg from "../assets/images/picture-gallary-images/miniature-wonders.jpg";
import scienceImg from "../assets/images/picture-gallary-images/science.png";
import tipsImg from "../assets/images/picture-gallary-images/tips-and-tricks.jpg";

export const picturesData = [
  // Origami & Paper Crafts
  {
    id: 1,
    categoryId: 1,
    titleKey: "pictures.origami.colorfulCranes",
    title: "Colorful Paper Cranes Collection",
    categoryTitleKey: "categories.origamiWorld",
    categoryTitle: "Origami World",
    image: origamiImg,
    description: "Beautiful collection of colorful origami cranes in various sizes and patterns",
    tags: ["origami", "paper", "cranes", "colorful"],
    difficulty: "intermediate",
    createdAt: "2024-01-15",
    likes: 245,
    featured: true
  },
  {
    id: 2,
    categoryId: 1,
    titleKey: "pictures.origami.paperFlowers",
    title: "Delicate Paper Flowers",
    categoryTitleKey: "categories.origamiWorld",
    categoryTitle: "Origami World",
    image: origamiImg,
    description: "Elegant paper flowers perfect for decoration",
    tags: ["origami", "flowers", "decoration"],
    difficulty: "beginner",
    createdAt: "2024-01-20",
    likes: 189,
    featured: false
  },

  // Drawing
  {
    id: 3,
    categoryId: 2,
    titleKey: "pictures.drawing.portraitSketch",
    title: "Portrait Sketching Techniques",
    categoryTitleKey: "categories.drawing",
    categoryTitle: "Drawing",
    image: drawingImg,
    description: "Learn advanced portrait sketching with pencil techniques",
    tags: ["drawing", "portrait", "pencil", "sketch"],
    difficulty: "advanced",
    createdAt: "2024-01-18",
    likes: 312,
    featured: true
  },
  {
    id: 4,
    categoryId: 2,
    titleKey: "pictures.drawing.landscapeArt",
    title: "Landscape Drawing Collection",
    categoryTitleKey: "categories.drawing",
    categoryTitle: "Drawing",
    image: drawingImg,
    description: "Beautiful landscape drawings using various techniques",
    tags: ["drawing", "landscape", "nature", "art"],
    difficulty: "intermediate",
    createdAt: "2024-01-22",
    likes: 267,
    featured: true
  },

  // Recycling Art
  {
    id: 5,
    categoryId: 3,
    titleKey: "pictures.recycling.bottleGarden",
    title: "Plastic Bottle Garden",
    categoryTitleKey: "categories.recyclingArt",
    categoryTitle: "Recycling Art",
    image: recyclingImg,
    description: "Creative garden made from recycled plastic bottles",
    tags: ["recycling", "bottles", "garden", "eco-friendly"],
    difficulty: "beginner",
    createdAt: "2024-01-25",
    likes: 198,
    featured: false
  },

  // Beads & Accessories
  {
    id: 6,
    categoryId: 4,
    titleKey: "pictures.beads.jewelrySet",
    title: "Handmade Jewelry Set",
    categoryTitleKey: "categories.beadsJewelry",
    categoryTitle: "Beads & Jewelry",
    image: beadsImg,
    description: "Elegant handmade jewelry set with colorful beads",
    tags: ["beads", "jewelry", "handmade", "accessories"],
    difficulty: "intermediate",
    createdAt: "2024-01-28",
    likes: 334,
    featured: true
  },

  // Clay Creations
  {
    id: 7,
    categoryId: 5,
    titleKey: "pictures.clay.potteryBowl",
    title: "Ceramic Pottery Bowl",
    categoryTitleKey: "categories.clay",
    categoryTitle: "Clay",
    image: clayImg,
    description: "Beautiful handcrafted ceramic bowl with unique patterns",
    tags: ["clay", "pottery", "ceramic", "bowl"],
    difficulty: "advanced",
    createdAt: "2024-01-30",
    likes: 278,
    featured: false
  },

  // Preschool Crafts
  {
    id: 8,
    categoryId: 6,
    titleKey: "pictures.preschool.fingerPainting",
    title: "Colorful Finger Painting",
    categoryTitleKey: "categories.preschoolCrafts",
    categoryTitle: "Preschool Crafts",
    image: preschoolImg,
    description: "Fun finger painting activities for young children",
    tags: ["preschool", "finger painting", "colors", "kids"],
    difficulty: "beginner",
    createdAt: "2024-02-02",
    likes: 156,
    featured: false
  },

  // Perler Beads
  {
    id: 9,
    categoryId: 7,
    titleKey: "pictures.perler.pixelArt",
    title: "Pixel Art Characters",
    categoryTitleKey: "categories.perlerBeads",
    categoryTitle: "Perler Beads",
    image: perlerBeadsImg,
    description: "Colorful pixel art characters made with perler beads",
    tags: ["perler beads", "pixel art", "characters", "gaming"],
    difficulty: "intermediate",
    createdAt: "2024-02-05",
    likes: 423,
    featured: true
  },

  // 3D Pen Fun
  {
    id: 10,
    categoryId: 8,
    titleKey: "pictures.threeDPen.sculptures",
    title: "3D Pen Letter Art",
    categoryTitleKey: "categories.threeDPenFun",
    categoryTitle: "3D Pen Fun",
    image: threeDPenImg,
    description: "Creative letter sculptures made with 3D pen",
    tags: ["3D pen", "letters", "sculpture", "art"],
    difficulty: "advanced",
    createdAt: "2024-02-08",
    likes: 289,
    featured: true
  },

  // Miniature Wonders
  {
    id: 11,
    categoryId: 9,
    titleKey: "pictures.miniature.dollhouse",
    title: "Miniature Dollhouse Room",
    categoryTitleKey: "categories.miniatureWonders",
    categoryTitle: "Miniature Wonders",
    image: miniatureImg,
    description: "Detailed miniature dollhouse room with tiny furniture",
    tags: ["miniature", "dollhouse", "furniture", "detailed"],
    difficulty: "advanced",
    createdAt: "2024-02-10",
    likes: 367,
    featured: false
  },

  // Science & DIY
  {
    id: 12,
    categoryId: 10,
    titleKey: "pictures.science.experiment",
    title: "Colorful Science Experiment",
    categoryTitleKey: "categories.scienceDiy",
    categoryTitle: "Science & DIY",
    image: scienceImg,
    description: "Fun and educational science experiment with colorful results",
    tags: ["science", "experiment", "educational", "colorful"],
    difficulty: "intermediate",
    createdAt: "2024-02-12",
    likes: 234,
    featured: false
  },

  // Tips & Tricks
  {
    id: 13,
    categoryId: 11,
    titleKey: "pictures.tips.organization",
    title: "Craft Organization Tips",
    categoryTitleKey: "categories.tipsAndTricks",
    categoryTitle: "Tips & Tricks",
    image: tipsImg,
    description: "Smart organization tips for your craft supplies",
    tags: ["organization", "tips", "craft supplies", "storage"],
    difficulty: "beginner",
    createdAt: "2024-02-15",
    likes: 445,
    featured: true
  },

  // Additional featured pictures
  {
    id: 14,
    categoryId: 1,
    titleKey: "pictures.origami.butterfly",
    title: "Origami Butterfly Garden",
    categoryTitleKey: "categories.origamiWorld",
    categoryTitle: "Origami World",
    image: origamiImg,
    description: "Beautiful collection of origami butterflies in vibrant colors",
    tags: ["origami", "butterfly", "garden", "colorful"],
    difficulty: "intermediate",
    createdAt: "2024-02-18",
    likes: 298,
    featured: true
  },

  {
    id: 15,
    categoryId: 4,
    titleKey: "pictures.beads.bracelet",
    title: "Friendship Bracelet Collection",
    categoryTitleKey: "categories.beadsJewelry",
    categoryTitle: "Beads & Jewelry",
    image: beadsImg,
    description: "Colorful friendship bracelets with intricate bead patterns",
    tags: ["beads", "bracelet", "friendship", "patterns"],
    difficulty: "beginner",
    createdAt: "2024-02-20",
    likes: 387,
    featured: true
  }
];

// Helper function to get pictures by category
export const getPicturesByCategory = (categoryId) => {
  return picturesData.filter(picture => picture.categoryId === categoryId);
};

// Helper function to get featured pictures
export const getFeaturedPictures = () => {
  return picturesData.filter(picture => picture.featured);
};

// Helper function to get latest pictures
export const getLatestPictures = (limit = 8) => {
  return [...picturesData]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
};
