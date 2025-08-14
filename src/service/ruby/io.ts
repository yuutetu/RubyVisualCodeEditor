import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

const io_read_line = (): [string, number] => {
  return ["gets.chomp", RUBY_ORDER.ATOMIC]
}

const io_read_number = (): [string, number] => {
  // In Ruby, you can read a number from input and convert it to an integer.
  return ["gets.to_i", RUBY_ORDER.ATOMIC]
}

const io_puts = (
  block: Blockly.Block,
  generator: RubyGenerator,
): string => {
  const argument0 = generator.valueToCode(block, 'VALUE', RUBY_ORDER.NONE) || '""';
  return `puts ${argument0}\n`
}

const io_read_numbers = (): [string, number] => {
  // This is a placeholder for reading multiple numbers from input.
  // In Ruby, you might read a line and split it into numbers.
  return ["gets.chomp.split.map(&:to_i)", RUBY_ORDER.ATOMIC]
}

export const generators = {
  io_read_line,
  io_read_number,
  io_puts,
  io_read_numbers,
}