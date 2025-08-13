import * as io from './io'
import * as string from './string'
import * as array from './array'

export {
  io,
  string,
  array,
}

export const blocks = Object.assign(
  {},
  io.blocks,
  string.blocks,
  array.blocks,
)