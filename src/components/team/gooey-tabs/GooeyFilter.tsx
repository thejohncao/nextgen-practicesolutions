
import React from 'react';

/**
 * SVG filter for creating gooey effects between elements
 */
const GooeyFilter = () => {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="gooey"
        />
      </filter>
    </svg>
  );
};

export default GooeyFilter;
