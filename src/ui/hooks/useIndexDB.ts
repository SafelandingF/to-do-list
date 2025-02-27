import { deleteDB, IDBPDatabase, openDB } from 'idb';
import { TaskProps } from '../components/Task/Task';

// 每次建表都会导致dataBaseVersion++
// Db -> task_stroe
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
      }
    });
    return db;
  };

  const addTask = async (Task: TaskProps) => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    await store.add(Task);
    await tx.done;
  };

  const addTasks = async (Tasks: TaskProps[]) => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    for (const item of Tasks) {
      await store.add(item);
    }
    await tx.done;
  };

  const updateTask = async (Task: TaskProps) => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readwrite');
    const store = tx.objectStore('task');
    await store.put(Task);
    await tx.done;
  };

  const updateTasks = async (Tasks: TaskProps[]) => {
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

  const getPinnedTask = async () => {
    const _db = await initDb();
    const tx = _db.transaction('task', 'readonly');
    await tx.done;
  };

  const clearDB = async () => {
    await deleteDB(dataBaseName);
  };

  return {
    initDb,
    addTask,
    addTasks,
    updateTask,
    updateTasks,
    getPinnedTask,
    getAllTasks,
    clearDB
  };
};

export default useIndexDb;
