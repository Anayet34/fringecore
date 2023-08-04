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
    const selectedBoxIndex = colorBoxes.findIndex((box) => box.id === id);
    if (selectedBoxIndex === -1) return;

    const selectedBox = colorBoxes[selectedBoxIndex];
    const newColor = getRandomColor();
    const newBox = {
      id: Date.now(),
      color: newColor,
      isSplittable: true,
      orientation: type === 'vertical' ? 'horizontal' : 'vertical',
    };

    selectedBox.isSplittable = false;

    if (type === 'vertical') {
      setColorBoxes([
        ...colorBoxes.slice(0, selectedBoxIndex),
        newBox,
        { ...selectedBox, id: Date.now() + 1, orientation: 'horizontal', isSplittable: true },
        ...colorBoxes.slice(selectedBoxIndex + 1),
      ]);
    } else if (type === 'horizontal') {
      setColorBoxes([
        ...colorBoxes.slice(0, selectedBoxIndex),
        { ...selectedBox, id: Date.now() + 1, orientation: 'vertical', isSplittable: true },
        newBox,
        ...colorBoxes.slice(selectedBoxIndex + 1),
      ]);
    }
  };

  const removeColorBox = (id) => {
    setColorBoxes(colorBoxes.filter((box) => box.id !== id));
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








