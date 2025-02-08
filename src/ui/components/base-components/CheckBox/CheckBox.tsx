import { useId } from 'react';
import './CheckBox.css';

interface CheckBoxProps {
  size: string | number;
  disable: boolean;
  color: string;
}

// svg path数学小写相对位置 大写绝对位置

export const CheckBox: React.FC<CheckBoxProps> = (props: CheckBoxProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { color, disable, size } = props;
  const id = '--myself--checkbox' + useId();
  return (
    <>
      <div className="--myself-checkbox-container">
        <input type="checkbox" className="--myself-checkbox" id={id} />
        <label htmlFor={id} className=" relative w-96 h-96 bg-blue-500 flex">
          <div className="--myself-checkbox-svg-container relative w-16 h-16 bg-blue-200">
            <svg width="25" height="25" viewBox="0 0 25 25" className=" absolute top-1 left-1 ">
              <rect x="0" y="0" width="25" height="25" stroke="black" fill="none"></rect>
            </svg>
            <svg width="50" height="50" viewBox="0 0 50 50" className=" absolute top-0 left-0  ">
              <path
                className=" scale-60"
                d="m 35, -5 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                stroke="black"
                stroke-width="2"
                fill="none"
              ></path>
            </svg>
          </div>
        </label>
      </div>
    </>
  );
};
