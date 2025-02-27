import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import useGlobalConfig from './hooks/useGlobalConfig';
import useGetComponentSize from './hooks/useGetComponentSize';
import { deleteDB, openDB } from 'idb';
import useIndexDb from './hooks/useIndexDB';

function App() {
  const [element, setElement] = useState(['name1']);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setNewWindowSize } = useGlobalConfig();
  const mainWinodSize = useGetComponentSize(containerRef);

  //实现动态调整electron大小 加上setNewWindowsSize依赖会导致循环
  useEffect(() => {
    setNewWindowSize(mainWinodSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainWinodSize]);

  useGlobalShortcuts(
    [
      {
        keyboardKey: ['F12'],
        handler: () => window.electron.sendFrameAction('toggleDevtools')
      }
    ],
    undefined
  );

  //upgrade 升级数据库或者说是初始化数据库 数据库的版本和表结构在初始化时就确定了
  //DB -> store -> object
  //数据库的版本和表结构在初始化时就确定了 要及时更新版本啊我说
  // const initDb = async () => {
  //   const db = await openDB('noteDB', 1, {
  //     upgrade(database) {
  //       if (!database.objectStoreNames.contains('note')) {
  //         const store = database.createObjectStore('note', {
  //           keyPath: 'id'
  //         });
  //         //createIndex(indexName, keyPath)：定义索引字段。 索引要在第一次就创建好
  //         store.createIndex('text', 'text');
  //       }
  //     }
  //   });
  //   return db;
  // };

  // const addDb = async () => {
  //   const db = await initDb();
  //   await db.add('note', { id: 'note1', text: 'hello' });
  //   await db.add('note', { id: 'note2', text: 'hello2' });
  // };

  // const getDB = async () => {
  //   const db = await initDb();
  //   console.log(await db.get('note', 'note1'));
  //   //更新或插入数据（类似“存在则更新，否则新增”）。
  //   await db.put('note', { id: 'note1', text: 'hello3' });
  //   console.log(await db.get('note', 'note1'));
  // };

  // const batchUpadte = async () => {
  //   const db = await initDb();
  //   const tx = db.transaction('note', 'readwrite');
  //   const store = tx.objectStore('note');
  //   await store.put({ id: 'note1', text: 'hello4' });
  //   await store.put({ id: 'note2', text: 'hello5' });
  //   await store.put({ id: 'note3', text: 'hello5' });

  //   await tx.done;

  //   console.log(await db.getAllFromIndex('note', 'text', 'hello5'));
  //   // 通过索引查询
  // };

  // const iterateNotes = async () => {
  //   const db = await initDb();
  //   let cursor = await db.transaction('note').store.openCursor();
  //   while (cursor) {
  //     console.log(cursor.value);
  //     cursor = await cursor.continue();
  //   }
  // };

  // async function iterateStudents() {
  //   const db = await dbPromise;
  //   const cursor = await db.transaction('students').store.openCursor();
  //   while (cursor) {
  //     console.log(cursor.value);
  //     cursor = await cursor.continue();
  //   }
  // }
  // 作用：
  // 遍历所有学生记录，适用于大数据量分页处理。
  // useEffect(() => {
  //   let isMounted = true;
  //   batchUpadte();
  //   iterateNotes();
  //   return () => {
  //     isMounted = false;
  //     const clear = async () => {
  //       await deleteDB('noteDB');
  //     };
  //     clear();
  //   };
  // }, []);

  const testMainDB = useIndexDb('test');
  testMainDB.addTask({
    id: crypto.randomUUID(),
    task: 'test1',
    isFinished: false,
    isPinned: false,
    startTime: ''
  });
  const show = async () => {
    console.log(await testMainDB.getAllTasks());
  };
  show();
  return (
    <>
      <div className="bg-sky-600 box-border rounded-3xl" ref={containerRef}>
        <p className="handle-drag">这是一段话</p>
        <button
          type="button"
          title="max"
          className=" w-10 h-10 bg-red-200"
          onClick={() => console.log(crypto.randomUUID())}
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
        {element.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </>
  );
}

export default App;
