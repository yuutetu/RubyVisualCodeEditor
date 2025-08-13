import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

export const text = (block: Blockly.Block, generator: RubyGenerator): [string, number] => {
  // Text block.
  const text = block.getFieldValue('TEXT') || '';
  return [generator.quote_(text), RUBY_ORDER.ATOMIC];
}

export const string_slice = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Get slice from string.
  const string = generator.valueToCode(block, 'String', RUBY_ORDER.NONE) || '""';
  const range = block.getFieldValue('Range') || '0..-1';
  return [`${string}[${range}]`, RUBY_ORDER.ATOMIC];
}

export const generators = {
  text,
  string_slice,
}