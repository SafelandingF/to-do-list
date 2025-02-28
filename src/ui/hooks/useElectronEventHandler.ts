const useElectronEventHandler = () => {
  const handleMax = () => {
    // window.electron.sendFrameAction('maximize');
    window.electron.sendFrameAction('maximize');
  };
  const handleMin = () => {
    window.electron.sendFrameAction('minimize');
  };
  const handleClose = () => {
    window.electron.sendFrameAction('close');
  };
  const handleSetWindowSize = (payload: FrameWindowSize) => {
    window.electron.sendSetWindowSize(payload);
    console.log('handleSetWindowSize', payload);
  };
  return {
    handleMax,
    handleMin,
    handleClose,
    handleSetWindowSize
  };
};

export default useElectronEventHandler;
