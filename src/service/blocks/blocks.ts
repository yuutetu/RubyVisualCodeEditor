import * as io from './io'
import * as string from './string'

export {
  io,
  string,
}

export const blocks = Object.assign(
  {},
  io.blocks,
  string.blocks,
)