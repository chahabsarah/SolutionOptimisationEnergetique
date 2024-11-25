import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from './Animation - 1731803590558.json';

const SimIcon = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div >
      <Lottie options={defaultOptions} height={50} width={60} />
    </div>
  );
};

export default SimIcon;
