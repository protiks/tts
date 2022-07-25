import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  const { innerWidth: width } = window;
  return {
    width,
  }
}

const useWindowWidth = () => {
  const [viewPortWidth, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleSizing = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleSizing);
    return () => window.removeEventListener('resize', handleSizing);
  }, []);

  return {viewPort: viewPortWidth};
}

export default useWindowWidth