import { useEffect, useState } from 'react';
import useKeyboard from '../hooks/useKeyboard';
import { useStore } from '../hooks/useStore';

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();
  const textures = { dirt, grass, glass, wood, log };

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) setTexture(pressedTexture[0]);
    pressedTexture && console.log('pressed: ' + pressedTexture[0]);
  }, [setTexture, dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => clearTimeout(visibilityTimeout);
  }, [activeTexture]);

  return visible && <div className='absolute centered'>TextureSelector</div>;
};

export default TextureSelector;
