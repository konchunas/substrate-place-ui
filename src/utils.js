import { CHUNKS_PER_SIDE, PIXELS_PER_CHUNK } from "./settings"

export const CHUNK_COORDS = 0
export const PIXEL_COORDS = 1

export function fromCartesian(x, y)  {
  let chunk_x = Math.floor(x / CHUNKS_PER_SIDE);
  let chunk_y = Math.floor(y / CHUNKS_PER_SIDE);
  let chunkNumber = chunk_x + chunk_y * CHUNKS_PER_SIDE;
  
  let local_x = x % PIXELS_PER_CHUNK;
  let local_y = y % PIXELS_PER_CHUNK;
  let index = local_x + local_y * PIXELS_PER_CHUNK;

  return {chunkNumber: chunkNumber, index: index}
}

export function toCartesian(chunk, index) {
  let x = chunk % CHUNKS_PER_SIDE;
  let y = Math.floor(chunk / CHUNKS_PER_SIDE);

  x *= PIXELS_PER_CHUNK
  y *= PIXELS_PER_CHUNK

  x += index % PIXELS_PER_CHUNK;
  y += Math.floor(index / PIXELS_PER_CHUNK);
  return {x: x, y: y}
}

export function indexToCartesian(index, type) {
  let size = type == CHUNK_COORDS ? CHUNKS_PER_SIDE : PIXELS_PER_CHUNK
  let x = index % size
  let y = Math.floor(index / size)
  return {x: x, y: y}
}

export function cartesianToIndex(x, y, type) {
  let size = type == CHUNK_COORDS ? CHUNKS_PER_SIDE : PIXELS_PER_CHUNK
  let localX = x % size;
  let localY = y % size;
  return localX + localY * size;
}
