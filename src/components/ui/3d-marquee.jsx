"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

export function ThreeDMarquee({ images = [], duration = 40, pauseOnHover = true }) {
  const containerRef = useRef(null);
  const [hovering, setHovering] = React.useState(false);
  
  // Duplicamos las imágenes múltiples veces para un scroll suave
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-8"
      onMouseEnter={() => pauseOnHover && setHovering(true)}
      onMouseLeave={() => pauseOnHover && setHovering(false)}
    >
      <motion.div
        className="flex gap-6"
        animate={{
          x: hovering ? undefined : [0, -((images.length * 280) + (images.length * 24))],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
        style={{
          width: "fit-content",
        }}
      >
        {duplicatedImages.map((image, idx) => (
          <motion.div
            key={`image-${idx}`}
            className="relative flex-shrink-0"
            style={{
              transformStyle: "preserve-3d",
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              z: 50,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div
              className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <img
                src={image}
                alt={`Property ${idx + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

