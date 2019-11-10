import { CHUNKS_PER_SIDE, CHUNK_SIDE } from "./settings"

export function fromCartesian(x, y)  {
  let chunk_x = Math.floor(x / CHUNKS_PER_SIDE);
  let chunk_y = Math.floor(y / CHUNKS_PER_SIDE);
  let chunkNumber = chunk_x + chunk_y * CHUNKS_PER_SIDE;
  
  let local_x = x % CHUNK_SIDE;
  let local_y = y % CHUNK_SIDE;
  let index = local_x + local_y * CHUNK_SIDE;

  return {chunkNumber: chunkNumber, index: index}
}

export function toCartesian(chunk, index) {
  let x = chunk % CHUNKS_PER_SIDE;
  let y = Math.floor(chunk / CHUNKS_PER_SIDE);

  x += index % CHUNK_SIDE;
  y += Math.floor(index / CHUNK_SIDE);
  return {x: x, y: y}
}

export function indexToCartesian(index) {
  let x = index % CHUNK_SIDE
  let y = Math.floor(index / CHUNK_SIDE)
  return {x: x, y: y}
}

