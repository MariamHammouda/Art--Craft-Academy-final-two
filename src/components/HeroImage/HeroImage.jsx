import React from 'react'

// src\assets\images\HeroImg.png
import HeroImg from "../../assets/images/HeroImg.png"

const HeroImage = () => {
  return (
    <>
    <div>
        <img src={HeroImg} className="w-full h-auto"></img>
    </div>
    </>
  )
}

export default HeroImage;