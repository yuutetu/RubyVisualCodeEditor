import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

export const array_get_index = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Get element from array by index.
  const array = generator.valueToCode(block, 'Array', RUBY_ORDER.NONE) || '[]';
  const index = block.getFieldValue('Index') || '0';
  return [`${array}[${index}]`, RUBY_ORDER.ATOMIC];
}

export const array_slice = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Get slice from array.
  const array = generator.valueToCode(block, 'Array', RUBY_ORDER.NONE) || '[]';
  const range = block.getFieldValue('Range') || '0..-1';
  return [`${array}[${range}]`, RUBY_ORDER.ATOMIC];
}

export const generators = {
  array_get_index,
  array_slice,
}