// App.js
import React, { createContext, useState } from 'react';
import ColorBox from './ColorBox/ColorBox';

const AppContext = createContext();

const App = () => {
  const getRandomColor = () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const [colorBoxes, setColorBoxes] = useState([
    { id: 1, color: getRandomColor(), isSplittable: true, orientation: 'horizontal' },
  ]);

  const splitColorBox = (type, id) => {
    const newColor = getRandomColor();
    const newBox = {
      id: Date.now(),
      color: newColor,
      isSplittable: true,
      orientation: type === 'vertical' ? 'horizontal' : 'vertical',
    };

    setColorBoxes((prevColorBoxes) =>
      prevColorBoxes.map((box) =>
        box.id === id
          ? { ...box, isSplittable: false }
          : { ...box, isSplittable: true }
      ).concat(newBox)
    );
  };

  const removeColorBox = (id) => {
    setColorBoxes((prevColorBoxes) => prevColorBoxes.filter((box) => box.id !== id));
  };

  return (
    <div className="w-full h-screen flex flex-wrap">
      <AppContext.Provider value={{ removeColorBox, splitColorBox }}>
        {colorBoxes.map(({ id, color, isSplittable, orientation }) => (
          <ColorBox
            key={id}
            id={id}
            color={color}
            onSplit={isSplittable}
            orientation={orientation}
          />
        ))}
      </AppContext.Provider>
    </div>
  );
};

export default App;
export { AppContext };








