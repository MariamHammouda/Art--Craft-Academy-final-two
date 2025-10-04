import { useEffect } from "react";

const PinterestEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//assets.pinterest.com/js/pinit.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center">
      <a
        data-pin-do="embedBoard"
        data-pin-board-width="900"
        data-pin-scale-height="400"
        data-pin-scale-width="120"
        href="https://www.pinterest.com/ArtCraftAcademy1/origami-paper-crafts/"
      ></a>
    </div>
  );
};

export default PinterestEmbed;
