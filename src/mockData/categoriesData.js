import origami from "../assets/images/origami.png"
import drawing from "../assets/images/drawing.png"
import beads from "../assets/images/beads.png"
import clay from "../assets/images/clay.png"
import preschool from "../assets/images/preschool.png"
import recycleing from "../assets/images/recycleing.png"
import science from "../assets/images/science.png"
import perlerBeads from "../assets/images/perler-beads.ico"
import threeDPenFun from "../assets/images/3d-pen-fun.ico"
// Category banner images
import origamiCategory from "../assets/images/category-images/orgami-category.jpg"
import drawingCategory from "../assets/images/category-images/drawing-category.jpg"
import beadsCategory from "../assets/images/category-images/beads-category.jpg"
import perlerBeadsCategory from "../assets/images/picture-gallary-images/perler-beads.jpg"
import threeDPenCategory from "../assets/images/picture-gallary-images/3D-pen-letters.jpg"



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
    bannerImage: drawingCategory, // Using dedicated category image
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
    bannerImage: beadsCategory, // Using dedicated category image
    descriptionKey: "categories.descriptions.beadsJewelry",
  },
  {
    id: 5,
    titleKey: "categories.clay",
    color: "#FFAF00", // orange
    icon: clay,
    bannerImage: clay,
    descriptionKey: "categories.descriptions.clay",
  },
  {
    id: 6,
    titleKey: "categories.preschoolCrafts",
    color: "#FFEB00", // yellow
    icon: preschool,
    bannerImage: preschool,
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
];
