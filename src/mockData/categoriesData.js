import origami from "../assets/images/origami.png"
import drawing from "../assets/images/drawing.png"
import beads from "../assets/images/beads.png"
import clay from "../assets/images/clay.png"
import preschool from "../assets/images/preschool.png"
import recycleing from "../assets/images/recycleing.png"
import science from "../assets/images/science.png"
import perlerBeads from "../assets/images/perler-beads.ico"
import threeDPenFun from "../assets/images/3d-pen-fun.ico"
import miniatureWonders from "../assets/images/miniature-wonders.ico"
// Category banner images
import origamiCategory from "../assets/images/category-images/orgami-category.jpg"
import drawingCategory from "../assets/images/category-images/drawing-category.jpg"
import drawingPageCategory from "../assets/images/category-page-images/drawing.jpg"
import beadsCategory from "../assets/images/category-images/beads-category.jpg"
import beadsAccessoriesCategory from "../assets/images/category-page-images/beads-accessories.jpg"
import clayCategory from "../assets/images/category-page-images/clay.jpg"
import preschoolCraftsCategory from "../assets/images/category-page-images/preschool-crafts.jpg"
import perlerBeadsCategory from "../assets/images/picture-gallary-images/perler-beads.jpg"
import threeDPenCategory from "../assets/images/picture-gallary-images/3D-pen-letters.jpg"
import miniatureWondersCategory from "../assets/images/picture-gallary-images/miniature-wonders.jpg"
import miniatureWondersPageCategory from "../assets/images/category-page-images/miniature-wonders.png"



export const categoriesData = [
  {
    id: 1,
    titleKey: "categories.origamiWorld",
    color: "#FFEB00", // yellow
    icon: origami,
    bannerImage: origamiCategory, // Using dedicated category image
    descriptionKey: "categories.descriptions.origamiWorld",
  },
  {
    id: 2,
    titleKey: "categories.drawing",
    color: "#0065F8", // blue
    icon: drawing,
    bannerImage: drawingPageCategory,
    descriptionKey: "categories.descriptions.drawing",
  },
  {
    id: 3,
    titleKey: "categories.recyclingArt",
    color: "#08CB00", //  green
    icon: recycleing,
    bannerImage: recycleing,
    descriptionKey: "categories.descriptions.recyclingArt",
  },
  {
    id: 4,
    titleKey: "categories.beadsJewelry",
    color: "#FF2DD1", // pink
    icon: beads,
    bannerImage: beadsAccessoriesCategory,
    descriptionKey: "categories.descriptions.beadsJewelry",
  },
  {
    id: 5,
    titleKey: "categories.clay",
    color: "#FFAF00", // orange
    icon: clay,
    bannerImage: clayCategory,
    descriptionKey: "categories.descriptions.clay",
  },
  {
    id: 6,
    titleKey: "categories.preschoolCrafts",
    color: "#FFEB00", // yellow
    icon: preschool,
    bannerImage: preschoolCraftsCategory,
    descriptionKey: "categories.descriptions.preschoolCrafts",
  },
  {
    id: 7,
    titleKey: "categories.perlerBeads",
    color: "#0065F8", //  purple
    icon: perlerBeads,
    bannerImage: perlerBeadsCategory,
    descriptionKey: "categories.descriptions.perlerBeads",
  },
  {
    id: 8,
    titleKey: "categories.threeDPenFun",
    color: "#08CB00", // light yellow
    icon: threeDPenFun,
    bannerImage: threeDPenCategory,
    descriptionKey: "categories.descriptions.threeDPenFun",
  },
  {
    id: 9,
    titleKey: "categories.scienceDiy",
    color: "#FF2DD1", // red
    icon: science,
    bannerImage: science,
    descriptionKey: "categories.descriptions.scienceDiy",
  },
  {
    id: 10,
    titleKey: "categories.miniatureWonders",
    color: "#8B5CF6", // purple
    icon: miniatureWonders,
    bannerImage: miniatureWondersPageCategory,
    descriptionKey: "categories.descriptions.miniatureWonders",
  },
];
