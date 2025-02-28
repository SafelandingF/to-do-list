import { deleteDB, IDBPDatabase, openDB } from 'idb';
import { Task } from '../components/Task/Task';

// 每次建表都会导致dataBaseVersion++
// Db -> task_stroe
//DB -> store -> objectStore -> index
const useIndexDb = (dataBaseName: string) => {
  const initDb = async (): Promise<IDBPDatabase> => {
    const db = await openDB(dataBaseName, 1, {
      upgrade(_db) {
        let store;
        if (!_db.objectStoreNames.contains('task')) {
          store = _db.createObjectStore('task', {
            keyPath: 'id'
          });
        }
        if (store && !store?.indexNames.contains('isPinned')) {
          store.createIndex('isPinned', 'isPinned', { unique: false });
        }
        if (store && !store?.indexNames.contains('isFinished')) {
          store.createIndex('isFinished', 'isFinished', { unique: false });
        }
        if (store && !store?.indexNames.contains('isOverdue')) {
          store.createIndex('isOverdue', 'isOverdue', { unique: false });
        }
      }
    });
    return db;
  };

  const addTask = async (Task: Task) => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    await store.add(Task);
    await tx.done;
  };

  const addTasks = async (Tasks: Task[]) => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    for (const item of Tasks) {
      await store.add(item);
    }
    await tx.done;
  };

  const updateTask = async (Task: Task) => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    await store.put(Task);
    await tx.done;
  };

  const updateTasks = async (Tasks: Task[]) => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    for (const item of Tasks) {
      await store.put(item);
    }
    await tx.done;
  };

  const getAllTasks = async () => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readonly');
    const store = tx.objectStore('task');
    const tasks = await store.getAll();
    await tx.done;
    return tasks;
  };

  const getPinnedTasks = async () => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readonly');
    const store = tx.objectStore('task');
    const index = await store.index('isPinned');
    const tasks = await index.getAll(IDBKeyRange.only(1));
    await tx.done;

    return tasks;
  };

  const getFinishedTasks = async () => {
    const db = await initDb();
    const tx = db.transaction('task', 'readonly');
    const store = tx.objectStore('task');
    const index = store.index('isFinished');
    const tasks = await index.getAll(IDBKeyRange.only(1));
    await tx.done;
    return tasks;
  };

  const getUnfinishedTasks = async () => {
    const db = await initDb();
    const tx = db.transaction('task', 'readonly');
    const store = tx.objectStore('task');
    const index = store.index('isFinished');
    const tasks = await index.getAll(IDBKeyRange.only(0));
    await tx.done;
    return tasks;
  };

  const getOverDueTasks = async () => {
    const db = await initDb();
    const tx = db.transaction('task', 'readonly');
    const store = tx.objectStore('task');
    const index = store.index('isOverdue');
    const tasks = await index.getAll(IDBKeyRange.only(1));
    await tx.done;
    return tasks;
  };

  const clearDB = async () => {
    await deleteDB(dataBaseName);
  };

  const iterateDb = async (fn: (Task: Task) => void) => {
    const db = await initDb();
    const tx = db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    let cursor = await store.openCursor();
    while (cursor) {
      const _task = cursor.value;
      fn(_task);
      cursor = await cursor.continue();
    }
    await tx.done;
  };

  return {
    initDb,
    addTask,
    addTasks,
    updateTask,
    updateTasks,
    getPinnedTasks,
    getFinishedTasks,
    getOverDueTasks,
    getUnfinishedTasks,
    getAllTasks,
    iterateDb,
    clearDB
  };
};

export default useIndexDb;
