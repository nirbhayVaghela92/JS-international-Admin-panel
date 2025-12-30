// components/FallbackImage.tsx
"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import fallbackSrc from "@/assets/images/profile.png"; // Your fallback image

function isValidSrc(src: any): boolean {
  return (
    !!src &&
    (src.startsWith("/") || src.startsWith("http") || src.startsWith("https"))
  );
}

export function FallbackImage(props: ImageProps) {
  const { src, alt, ...rest } = props;
  const url = isValidSrc(src) ? src : null;

  const [imgSrc, setImgSrc] = useState(url);

  return (
    <Image
      {...rest}
      className="size-12 rounded-full border object-cover"
      src={imgSrc || fallbackSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
