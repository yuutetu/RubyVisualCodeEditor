import * as Blockly from 'blockly/core'
import {rubyGenerator} from "./ruby";
import {RubyOrder} from "@/service/ruby/ruby_generator";

const io_read_line = (block: Blockly.Block, generator: rubyGenerator) => {
  return ["gets.chomp\n", RubyOrder.ATOMIC]
}

export const generators = {
  io_read_line,
}