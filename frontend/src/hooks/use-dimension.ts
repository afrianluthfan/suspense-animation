import { RefObject, useLayoutEffect, useState } from "react";

export const useDimensions = (ref: RefObject<any>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: ref.current?.offsetWidth ?? 0,
        height: ref.current?.offsetHeight ?? 0,
      });
    };

    // Initial measurement
    updateDimensions();

    // Listen for resize events
    const resizeListener = () => {
      updateDimensions();
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [ref]);

  return dimensions;
};
