import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

export const text = (block: Blockly.Block, generator: RubyGenerator): [string, number] => {
  // Text block.
  const text = block.getFieldValue('TEXT') || '';
  return [generator.quote_(text), RUBY_ORDER.ATOMIC];
}

export const get_index = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Get element from array by index.
  const array = generator.valueToCode(block, 'Array', RUBY_ORDER.NONE) || '[]';
  const index = generator.valueToCode(block, 'Index', RUBY_ORDER.NONE) || '0';
  return [`${array}[${index}]`, RUBY_ORDER.ATOMIC];
}

export const slice = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Get slice from string.
  const string = generator.valueToCode(block, 'String', RUBY_ORDER.NONE) || '""';
  const start = generator.valueToCode(block, 'Index', RUBY_ORDER.NONE) || '0';
  const count = generator.valueToCode(block, 'Count', RUBY_ORDER.NONE) || '0';
  return [`${string}[${start},${count}]`, RUBY_ORDER.ATOMIC];
}

export const generators = {
  text,
  slice,
  get_index,
}