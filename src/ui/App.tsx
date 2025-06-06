import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import useGlobalConfig from './hooks/useConfig';
import useGetComponentSize from './hooks/useElementSize';
import { deleteDB, openDB } from 'idb';
import useIndexDb from './hooks/useIndexDB';
import dayjs from 'dayjs';
import Layout from './layout';

function App() {
  const [element, setElement] = useState(['name1']);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNewWindowSize } = useGlobalConfig();
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

  //实现动态调整electron大小 加上setNewWindowsSize依赖会导致循环
  useEffect(() => {
    console.log(mainWinodSize);
    setNewWindowSize(mainWinodSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainWinodSize]);

  // const testMainDB = useIndexDb('test');
  // testMainDB.clearDB();

  // const show = async () => {
  //   await testMainDB.addTask({
  //     id: crypto.randomUUID(),
  //     task: 'test1',
  //     isFinished: 0,
  //     isPinned: 0,
  //     startTime: ''
  //   });
  //   await testMainDB.addTask({
  //     id: crypto.randomUUID(),
  //     task: 'test2',
  //     isFinished: 1,
  //     isPinned: 1,
  //     startTime: ''
  //   });
  //   console.log(await testMainDB.getPinnedTasks());
  //   console.log(await testMainDB.getAllTasks());
  // };
  // show();

  // window.electron.handleCheckOverdueTask((now) => console.log(now));

  // const time = dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss');
  // window.electron.handleCheckOverdueTask((now) => {
  //   const ans = dayjs(time).isBefore(now);
  //   console.log(time);
  //   console.log(now);
  //   console.log(ans);
  // });

  const [isFold, setIsFold] = useState(false);

  const handleSetFold = () => {
    setIsFold(!isFold);
    console.log('fold');
  };

  // return (
  //   <>
  //     <div
  //       className="bg-transparent box-border rounded-3xl w-[1000px] h-[1000px]"
  //       ref={containerRef}
  //     >
  //       <p className="handle-drag">这是一段话</p>
  //       <button
  //         type="button"
  //         title="max"
  //         className=" w-10 h-10 bg-red-200"
  //         onClick={() => window.electron.sendFrameAction('maximize')}
  //       >
  //         max
  //       </button>
  //       <button
  //         type="button"
  //         title="max"
  //         className=" w-10 h-10 bg-red-200"
  //         onClick={() => window.electron.sendFrameAction('minimize')}
  //       >
  //         max
  //       </button>
  //       <button
  //         type="button"
  //         title="max"
  //         className=" w-10 h-10 bg-red-200 ml-5"
  //         onClick={() => setElement(element.concat('name2'))}
  //       >
  //         set
  //       </button>
  //       {element.map((item, index) => {
  //         return <div key={index}>{item}</div>;
  //       })}
  //     </div>
  //   </>
  // );

  return (
    <>
      <Layout isFold={isFold} handleFold={handleSetFold}></Layout>
    </>
  );
}

export default App;
