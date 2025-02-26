import useWindowStore from '../store/useWindowStore';

const useGlobalConfig = () => {
  // 这里每次修改会导致重新渲染
  /**
   * 这会订阅所有状态变化（包括 windowWidth 和 windowHeight），
   * 即使组件只关心部分状态。当 windowWidth 或 windowHeight 变化时，useGlobalConfig 所在的组件会重新渲染，
   * 导致其返回的方法（如 increaseWindowSize）引用变化，进而触发依赖这些方法的副作用（如 useEffect）。
   */
  // 或许使用get函数就不会导致重新渲染了
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
    window.electron?.setWindowSize(payload);
  };

  return {
    htmlFontSizeWithPx,
    increaseWindowSize,
    setNewWindowSize
  };
};

export default useGlobalConfig;
