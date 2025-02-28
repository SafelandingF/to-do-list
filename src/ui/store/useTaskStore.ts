import { create } from 'zustand';
import { Task } from '../components/Task/Task';

interface TasksStoreState {
  DataBase: string;
  Task: Task[];
}
type State = {
  tasksSort: TasksStoreState[];
};

interface Action {
  addNewTaskSort: (sort: TasksStoreState) => void;
  removeTaskSort: (dataBaseName: string) => void;
  editTaskSort: (newTaskStore: TasksStoreState[]) => void;
}

// 要注意命名策略 create方法中要实现全部的属性，名称也得保证，不然会报错，不能传入基本类型
const useTaskStore = create<State & Action>((set) => ({
  tasksSort: [],

  addNewTaskSort: (sort) =>
    set((state) => ({ tasksSort: [...state.tasksSort, sort] })),

  removeTaskSort: (dataBaseName) =>
    set((state) => ({
      tasksSort: state.tasksSort.filter(
        (task) => task.DataBase !== dataBaseName
      )
    })),

  editTaskSort: (newTaskStore) => set(() => ({ tasksSort: newTaskStore }))
}));

export default useTaskStore;
