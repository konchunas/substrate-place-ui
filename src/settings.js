export const CHUNKS_PER_SIDE = 8;
export const PIXELS_PER_CHUNK = 8;
export const FIELD_SIZE = CHUNKS_PER_SIDE * PIXELS_PER_CHUNK;

export const MIN_COORD = -1 * Math.pow(2, 34); //2^31 + 2^3
export const MAX_COORD = Math.pow(2, 34) - 1; //2^31 + 2^3