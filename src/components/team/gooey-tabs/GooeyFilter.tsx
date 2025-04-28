
import React from 'react';

/**
 * Enhanced SVG filter for creating more pronounced gooey effects between elements
 * Based on the reference design from 21st.dev/danielpetho/gooey-filter/tabs
 */
const GooeyFilter = () => {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      {/* Main gooey effect filter - enhanced for better blob formation */}
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
          result="gooey"
        />
      </filter>
      
      {/* Additional filter for glowing effects */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* Color-specific glow filters for each agent */}
      <filter id="green-glow">
        <feFlood floodColor="#22c55e" floodOpacity="0.7" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="2" intercept="-0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="transfer" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="blue-glow">
        <feFlood floodColor="#3b82f6" floodOpacity="0.7" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="2" intercept="-0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="transfer" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="purple-glow">
        <feFlood floodColor="#a855f7" floodOpacity="0.7" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="2" intercept="-0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="transfer" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="gold-glow">
        <feFlood floodColor="#fbbf24" floodOpacity="0.7" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="2" intercept="-0.3" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="transfer" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
};

export default GooeyFilter;
