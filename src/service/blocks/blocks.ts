import * as Blockly from 'blockly/core'
import * as io from './io'
import * as string from './string'
import * as array from './array'
import * as logic from './logic'

export {
  io,
  string,
  array,
  logic,
}

export const blocks = Object.assign(
  {},
  io.blocks,
  string.blocks,
  array.blocks,
  logic.blocks,
)