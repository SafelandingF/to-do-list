import { Smile } from 'lucide-react';
import { CheckBox } from './components/base-components/CheckBox/CheckBox';
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import './App.css';
import useGlobalConfig from './hooks/useGlobalConfig';
import useGetComponentSize from './hooks/useGetComponentSize';

function App() {
  const [element, setElement] = useState(['name1']);
  const containerRef = useRef<HTMLDivElement>(null);
  const globalConfig = useGlobalConfig();
  const mainWinodSize = useGetComponentSize(containerRef);

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
      <div className="bg-sky-600 box-border rounded-3xl" ref={containerRef}>
        <p className="handle-drag">这是一段话</p>
        <button
          type="button"
          title="max"
          className=" w-10 h-10 bg-red-200"
          onClick={() => console.log(mainWinodSize?.width)}
        >
          max
        </button>
        <button
          type="button"
          title="max"
          className=" w-10 h-10 bg-red-200"
          onClick={() => console.log(mainWinodSize?.height)}
        >
          max
        </button>
        <button
          type="button"
          title="max"
          className=" w-10 h-10 bg-red-200 ml-5"
          onClick={() => setElement(element.concat('name2'))}
        >
          set
        </button>
        {element.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default App;
