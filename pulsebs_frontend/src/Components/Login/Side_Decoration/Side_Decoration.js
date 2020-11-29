import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../Assets/Animations/Login_Animation.json';

const sideDecoration = () => {

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return <div className= "AnimationContainer">
    <Lottie
      options={defaultOptions}
      height={350}
      width={350}
    />
  </div>

}

export default sideDecoration;
