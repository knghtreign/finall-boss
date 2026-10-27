import React, { useRef } from 'react';
import {
  motion,
  type HTMLMotionProps,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';

// Premium Apple & Webflow standard cubic bezier easing
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const NATURAL_EASE = [0.16, 1, 0.3, 1] as const;

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  animation?:
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'pop-up'
    | 'fade-up'
    | 'fade'
    | 'pop'
    | 'scale-up'
    | 'blur-in';
  distance?: number;
  duration?: number; // in seconds
  once?: boolean;
  amount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
  distance = 24,
  duration = 0.55,
  once = false, // Re-animates both on scroll down AND scroll up per user requirement!
  amount = 0.15,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, provide gentle opacity fade with zero translation/blur
  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 0.35, delay: delay / 1000 }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const getVariants = () => {
    switch (animation) {
      case 'slide-down':
        return {
          hidden: { opacity: 0, y: -distance, filter: 'blur(4px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay: delay / 1000,
              ease: LUXURY_EASE,
            },
          },
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: -distance, filter: 'blur(4px)' },
          visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay: delay / 1000,
              ease: LUXURY_EASE,
            },
          },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: distance, filter: 'blur(4px)' },
          visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay: delay / 1000,
              ease: LUXURY_EASE,
            },
          },
        };
      case 'pop-up':
      case 'pop':
      case 'scale-up':
        return {
          hidden: { opacity: 0, scale: 0.94, y: distance * 0.6, filter: 'blur(4px)' },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: duration * 1.08,
              delay: delay / 1000,
              ease: LUXURY_EASE,
            },
          },
        };
      case 'blur-in':
        return {
          hidden: { opacity: 0, filter: 'blur(8px)' },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: {
              duration: duration * 1.1,
              delay: delay / 1000,
              ease: NATURAL_EASE,
            },
          },
        };
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay: delay / 1000,
              ease: NATURAL_EASE,
            },
          },
        };
      case 'slide-up':
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: distance, filter: 'blur(4px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration,
              delay: delay / 1000,
              ease: LUXURY_EASE,
            },
          },
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin: '-50px 0px -50px 0px', // Triggers naturally right before coming into viewport
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Aliases for clean backward compatibility with previous code
export const SlideUp: React.FC<Omit<ScrollRevealProps, 'animation'>> = (props) => (
  <ScrollReveal animation="slide-up" {...props} />
);

export const SlideDown: React.FC<Omit<ScrollRevealProps, 'animation'>> = (props) => (
  <ScrollReveal animation="slide-down" {...props} />
);

export const PopUp: React.FC<Omit<ScrollRevealProps, 'animation'>> = (props) => (
  <ScrollReveal animation="pop-up" {...props} />
);

export const FadeUp: React.FC<Omit<ScrollRevealProps, 'animation'>> = (props) => (
  <ScrollReveal animation="fade-up" {...props} />
);

export const ScaleIn: React.FC<Omit<ScrollRevealProps, 'animation'>> = (props) => (
  <ScrollReveal animation="scale-up" {...props} />
);

/**
 * StaggerContainer & StaggerItem:
 * Orchestrates card grids, step lists, and feature items so they sequentially
 * reveal one after another with natural fluid timing (60-100ms stagger).
 */
export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number; // in seconds, default 0.08s
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.04,
  once = false,
  amount = 0.12,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
        margin: '-40px 0px -40px 0px',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  scale?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  distance = 22,
  scale = 0.96,
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: distance, scale, filter: 'blur(4px)' },
    visible: shouldReduceMotion
      ? { opacity: 1, transition: { duration: 0.3 } }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.55,
            ease: LUXURY_EASE,
          },
        },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

/**
 * TextReveal:
 * Webflow/Apple-style heading word-by-word reveal that unmasks text
 * with silky smooth deceleration on scroll.
 */
export interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  highlightWords?: string[];
  highlightClass?: string;
  delay?: number;
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  as: Component = 'h2',
  highlightWords = [],
  highlightClass = 'text-[#293549]',
  delay = 0,
  once = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: delay / 1000,
      },
    },
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.52,
        ease: LUXURY_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: '-50px 0px -50px 0px' }}
      className="inline-block"
    >
      <Component className={className}>
        {words.map((word, i) => {
          const isHighlight = highlightWords.some((hw) =>
            word.toLowerCase().includes(hw.toLowerCase())
          );
          return (
            <motion.span
              key={`${word}-${i}`}
              variants={wordVariant}
              className={`inline-block mr-[0.26em] ${isHighlight ? highlightClass : ''}`}
            >
              {word}
            </motion.span>
          );
        })}
      </Component>
    </motion.div>
  );
};

/**
 * ParallaxWrapper:
 * Scroll-linked smooth parallax effect for background decorations,
 * portraits, or cards to create layered 3D depth.
 */
export interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // negative moves up faster, positive moves down
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  className = '',
  speed = 25,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-speed, speed]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

/**
 * ImageReveal:
 * Smooth scale & clip reveal for photographic showcases.
 */
export interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  delay?: number;
  once?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  delay = 0,
  once = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0.2, margin: '-40px 0px -40px 0px' }}
      transition={{
        duration: 0.75,
        delay: delay / 1000,
        ease: LUXURY_EASE,
      }}
      className={`overflow-hidden ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105 ${imageClassName}`}
      />
    </motion.div>
  );
};
