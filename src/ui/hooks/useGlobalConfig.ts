const useGlobalConfig = () => {
  const htmlFontSizeWithPx = () => {
    return window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size');
  };
  return {
    htmlFontSizeWithPx
  };
};

export default useGlobalConfig;
