import React from "react";

import NextImage, { ImageProps as NextImageProps } from "next/image";

import clsxm from "@/utils/clsxm";


const StyledImage = ({ src, alt, className, ...other }) => {
  return (
    <div className={clsxm("relative h-[272px] w-[232px]", className)}>
      <NextImage
        fill
        sizes="h-[272px] w-[232px]"
        src={src}
        alt={alt || ""}
        {...other}
        priority
        fetchPriority="high"
      />
    </div>
  );
};

export default StyledImage;
