import { Smile } from 'lucide-react';
import { CheckBox } from './components/base-components/CheckBox/CheckBox';

function App() {
  const handleMax = () => {
    // window.electron.sendFrameAction('maximize');
    window.electron.sendFrameAction('maximize');
  };
  const handleMin = () => {
    window.electron.sendFrameAction('minimize');
  };

  return (
    <>
      <div className="bg-sky-600">
        <p>这是一段话</p>
        <button
          type="button"
          title="max"
          className=" w-10 h-10 bg-red-200"
          onClick={handleMax}
        >
          max
        </button>
      </div>
    </>
  );
}

export default App;
