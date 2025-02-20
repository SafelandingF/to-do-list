import { Smile } from 'lucide-react';
import { CheckBox } from './components/base-components/CheckBox/CheckBox';
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import './App.css';

function App() {
  // const [nowDate, setNowData] = useState(dayjs());

  // // 不加useEffect会导致定时器越来越多
  // useEffect(() => {
  //   const timeInterval = setInterval(() => {
  //     setNowData(dayjs());
  //   }, 1000);
  //   return () => {
  //     clearInterval(timeInterval);
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('nowDate', nowDate);
  // }, [nowDate]);

  const handleMax = () => {
    // window.electron.sendFrameAction('maximize');
    window.electron.sendFrameAction('maximize');
    console.log('handleMax');
  };
  // const handleMin = () => {
  //   window.electron.sendFrameAction('minimize');
  // };
  // const handleClose = () => {
  //   window.electron.sendFrameAction('close');
  // };
  const handleSetWindowSize = (payload: FrameWindowSize) => {
    window.electron.setWindowSize(payload);
    console.log('handleSetWindowSize', payload);
  };

  useGlobalShortcuts(
    [
      {
        keyboardKey: ['F12'],
        handler: () => window.electron.sendFrameAction('toggleDevtools')
      }
    ],
    undefined
  );

  return (
    <>
      <div className="bg-sky-600 handle-drag box-border  w-2xs h-30 rounded-3xl">
        <p className="handle-drag">这是一段话</p>
        <button
          type="button"
          title="max"
          className=" w-10 h-10 bg-red-200"
          onClick={handleMax}
        >
          max
        </button>
        <button
          type="button"
          title="max"
          className=" w-10 h-10 bg-red-200 ml-5"
          onClick={() => handleSetWindowSize({ width: 100, height: 100 })}
        >
          set
        </button>
      </div>
    </>
  );
}

export default App;
