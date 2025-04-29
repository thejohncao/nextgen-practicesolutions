
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  type?: 'char' | 'word' | 'whole';
  staggerChildren?: number;
  delay?: number;
  gradient?: boolean;
  once?: boolean;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  className,
  as = 'h2',
  type = 'word',
  staggerChildren = 0.05,
  delay = 0,
  gradient = true,
  once = true,
}) => {
  const headingClasses = cn(
    'font-heading font-bold',
    gradient && 'text-gradient',
    className
  );
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerChildren, 
        delayChildren: delay * i,
      },
    }),
  };
  
  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };
  
  const Heading = ({ children }) => {
    const Component = as;
    return <Component className={headingClasses}>{children}</Component>;
  };
  
  if (type === 'char') {
    return (
      <Heading>
        <motion.span
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
        >
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={child}
              style={{
                display: 'inline-block',
                whiteSpace: char === ' ' ? 'pre' : 'normal',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Heading>
    );
  }
  
  if (type === 'word') {
    return (
      <Heading>
        <motion.span
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once }}
        >
          {text.split(' ').map((word, index) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={child}
            >
              {word}
              {index !== text.split(' ').length - 1 && '\u00A0'}
            </motion.span>
          ))}
        </motion.span>
      </Heading>
    );
  }
  
  // Whole text animation
  return (
    <Heading>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay
        }}
        viewport={{ once }}
      >
        {text}
      </motion.span>
    </Heading>
  );
};

export default AnimatedHeading;
