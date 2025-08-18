import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

const range = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Create a range of numbers.
  const from = generator.valueToCode(block, 'FROM', RUBY_ORDER.NONE) || '0';
  const to = generator.valueToCode(block, 'TO', RUBY_ORDER.NONE) || '0';
  return [`(${from}..${to}).to_a`, RUBY_ORDER.ATOMIC];
}

const lists_create_with = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Create a list with given values.
  const elements = [];
  const createWithBlock = block as Blockly.Block & { itemCount_: number };
  for (let i = 0; i < createWithBlock.itemCount_; i++) {
    const element = generator.valueToCode(block, `ADD${i}`, RUBY_ORDER.NONE) || 'nil';
    elements.push(element);
  }
  return [`[${elements.join(', ')}]`, RUBY_ORDER.ATOMIC];
}

export const generators = {
  range,
  lists_create_with,
}