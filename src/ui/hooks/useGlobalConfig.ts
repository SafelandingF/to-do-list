import useWindowStore from '../store/useWindowStore';

const useGlobalConfig = () => {
  const windowStore = useWindowStore();

  const htmlFontSizeWithPx = () => {
    return window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('font-size');
  };

  const increaseWindowSize = (windowSize: {
    width: number;
    height: number;
  }) => {
    windowStore.increaseWindowWidth(windowSize.width);
    windowStore.increaseWindowHeight(windowSize.height);
    _handleSetWindowSize({
      width: windowSize.width + windowStore.windowWidth,
      height: windowSize.height + windowStore.windowHeight
    });
  };

  const setNewWindowSize = (windowSize: { width: number; height: number }) => {
    windowStore.setWindowWidth(windowSize.width);
    windowStore.setWindowHeight(windowSize.height);
    _handleSetWindowSize({
      width: windowSize.width,
      height: windowSize.height
    });
  };

  const _handleSetWindowSize = (payload: FrameWindowSize) => {
    window.electron.setWindowSize(payload);
  };
  return {
    htmlFontSizeWithPx,
    increaseWindowSize,
    setNewWindowSize
  };
};

export default useGlobalConfig;
