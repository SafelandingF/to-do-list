// 最上面两个是最主要的接口

interface Window {
  electron: {
    sendFrameAction: (action: FrameWindowAction) => void;
    setWindowSize: (size: FrameWindowSize) => void;
  };
}

interface EventPayLoadMapping {
  sendFrameAction: FrameWindowAction;
  setWindowSize: FrameWindowSize;
}

// close 关闭当前窗口 quit 退出整个应用

type FrameWindowAction = 'minimize' | 'maximize' | 'close' | 'toggleDevtools';

type FrameWindowSize = {
  width: number;
  height: number;
};
