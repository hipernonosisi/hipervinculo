import { type ImgHTMLAttributes } from 'react';
import dimensions from '@/data/imageDimensions.json';
const sizes: Record<string, number[]> = dimensions;
export function ContentImage({ src, width, height, loading, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const known = src ? sizes[src] : undefined;
  return <img src={src} width={width ?? known?.[0]} height={height ?? known?.[1]} loading={loading ?? 'lazy'} decoding="async" {...props} />;
}
