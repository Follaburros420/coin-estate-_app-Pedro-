import clsxm from "@/utils/clsxm";
import NextImage from "next/image";
import React from "react";

const StyledImage = ({ src, alt = "", className, imgClassName, priority, fetchPriority, ...other }) => {
  const containerClass = className ? clsxm('relative', className) : 'relative h-[272px] w-[232px]';

  return (
    <div className={containerClass}>
      <NextImage
        fill
        className={clsxm('object-cover', imgClassName)}
        sizes='100%'
        src={src}
        alt={alt}
        priority={priority}
        fetchPriority={fetchPriority}
        {...other}
      />
    </div>
  );
};

export default StyledImage;
