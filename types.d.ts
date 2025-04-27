// 最上面两个是最主要的接口

interface Window {
  electron: {
    sendFrameAction: (action: FrameWindowAction) => void;
    sendSetWindowSize: (size: FrameWindowSize) => void;
    handleCheckOverdueTask: (cb: (nowTime: nowTime) => void) => Unsubscribe;
  };
  __devtron?: {
    require: unknown;
    process: unknown;
  };
  node?: unknown;
}

interface Config {
  version: string;
  color:string;
  isAutoLaunch: boolean;
  // 设置初始的显示状态
  initValue?:string
}

// 我觉得是不是send和on事件应该分开呢？

interface EventPayLoadMapping {
  sendFrameAction: FrameWindowAction;
  sendSetWindowSize: FrameWindowSize;
  handleCheckOverdueTask: nowTime;
}

// close 关闭当前窗口 quit 退出整个应用

type FrameWindowAction = 'minimize' | 'maximize' | 'close' | 'toggleDevtools';

type FrameWindowSize = {
  width: number;
  height: number;
};
type nowTime = string;
type Unsubscribe = () => void;

type OnCheckOverdueTask = (cb: (nowTime: string) => void) => Unsubscribe;
