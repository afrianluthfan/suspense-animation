"use client";

import React, { FC, useState } from "react";
import TransitionLayerExit from "./TransitionLayer.tsx/TransitionLayerExit";

const TestButton: FC = () => {
  const [go, setGo] = useState(false);

  const goHandler = () => {
    setGo(true);
  };

  return (
    <>
      <button type="button" onClick={goHandler}>
        trigger animation
      </button>
      {go ? <TransitionLayerExit bgColor={0} reset={() => {}} /> : null}
    </>
  );
};

export default TestButton;
