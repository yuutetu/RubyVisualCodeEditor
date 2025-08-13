import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

export const string_slice = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Get slice from string.
  const string = generator.valueToCode(block, 'String', RUBY_ORDER.NONE) || '""';
  const range = block.getFieldValue('range') || '0..-1';
  return [`${string}[${range}]`, RUBY_ORDER.ATOMIC];
}

export const generators = {
  string_slice,
}