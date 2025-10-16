const setFontSize = (windowWidth, windowHeight, factor) => {
  return Math.floor(
    (windowWidth < windowHeight ? windowWidth : windowHeight) / factor
  );
};

export default setFontSize;
