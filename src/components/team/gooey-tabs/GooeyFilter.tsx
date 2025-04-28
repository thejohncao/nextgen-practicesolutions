
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
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
          result="gooey"
        />
      </filter>
      
      {/* Color-specific glow filters for each agent */}
      <filter id="green-glow">
        <feFlood floodColor="#22c55e" floodOpacity="0.4" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="1.5" intercept="-0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="transfer" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="blue-glow">
        <feFlood floodColor="#3b82f6" floodOpacity="0.4" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="1.5" intercept="-0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="transfer" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="purple-glow">
        <feFlood floodColor="#a855f7" floodOpacity="0.4" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="1.5" intercept="-0.2" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="transfer" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="gold-glow">
        <feFlood floodColor="#fbbf24" floodOpacity="0.4" result="flood" />
        <feComposite in="flood" in2="SourceGraphic" operator="in" result="composite" />
        <feGaussianBlur in="composite" stdDeviation="3" result="blur" />
        <feComponentTransfer in="blur" result="transfer">
          <feFuncA type="linear" slope="1.5" intercept="-0.2" />
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
