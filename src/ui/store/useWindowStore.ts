import { create } from 'zustand';
interface WindowStoreState {
  windowWidth: number;
  windowHeight: number;
}

interface WindowStoreActions {
  setWindowWidth: (width: number) => void;
  setWindowHeight: (height: number) => void;
  increaseWindowWidth: (increaseNumber: number) => void;
  increaseWindowHeight: (increaseNumber: number) => void;
}

const useWindowStore = create<WindowStoreState & WindowStoreActions>((set) => ({
  windowWidth: 0,
  windowHeight: 0,
  setWindowWidth: (width) => set({ windowWidth: width }),
  setWindowHeight: (height) => set({ windowHeight: height }),
  increaseWindowWidth: (increaseNumber) =>
    set((state) => ({ windowWidth: state.windowWidth + increaseNumber })),
  increaseWindowHeight: (increaseNumber) =>
    set((state) => ({ windowHeight: state.windowHeight + increaseNumber }))
}));

export default useWindowStore;
