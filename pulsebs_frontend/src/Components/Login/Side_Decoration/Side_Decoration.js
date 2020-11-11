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
      height={400}
      width={400}
    />
  </div>

}

export default sideDecoration;
