import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

const io_read_line = (): [string, number] => {
  return ["gets.chomp", RUBY_ORDER.ATOMIC]
}

const io_puts = (
  block: Blockly.Block,
  generator: RubyGenerator,
): string => {
  const argument0 = generator.valueToCode(block, 'VALUE', RUBY_ORDER.NONE) || '""';
  return `puts ${argument0}`

}

export const generators = {
  io_read_line,
  io_puts,
}