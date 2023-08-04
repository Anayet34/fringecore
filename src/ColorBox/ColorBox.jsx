import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import './ColorBox.css';

const ColorBox = ({ color, onSplit, id }) => { 
  const { removeColorBox, splitColorBox } = useContext(AppContext);

  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

  const onDrag = (e) => {
    const { clientX, clientY } = e;
    const { left, top } = e.target.getBoundingClientRect();
    const newWidth = clientX - left;
    const newHeight = clientY - top;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <div
      className="color-box"
      style={{ width: `${width}px`, height: `${height}px`, backgroundColor: color }}
    >
      {onSplit && (
        <>
          <button className="split-btn v-split" onClick={() => splitColorBox('vertical', id)}> 
            V
          </button>
          <button className="split-btn h-split" onClick={() => splitColorBox('horizontal', id)}> 
            H
          </button>
        </>
      )}
      <button className="remove-btn" onClick={() => removeColorBox(id)}> 
        -
      </button>
      <div
        className="resizer"
        onMouseDown={(e) => {
          e.preventDefault();
          window.addEventListener('mousemove', onDrag);
          window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', onDrag);
          });
        }}
      ></div>
    </div>
  );
};

export default ColorBox;









