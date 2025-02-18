// 最上面两个是最主要的接口

interface Window {
  electron: {
    sendFrameAction: (action: frameWindowAction) => void;
  };
}

interface EventPayLoadMapping {
  sendFrameAction: frameWindowAction;
}

// close 关闭当前窗口 quit 退出整个应用

type frameWindowAction = 'minimize' | 'maximize' | 'close' | 'toggleDevtools';
