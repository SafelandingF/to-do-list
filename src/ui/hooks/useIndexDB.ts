import { openDB } from 'idb';

// 每次建表都会导致dataBaseVersion++
const useIndexDb = (dataBaseName: string) => {};

export default useIndexDb;
