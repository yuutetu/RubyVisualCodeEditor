import * as Blockly from 'blockly/core'
import {rubyGenerator} from "./ruby";
import {RubyOrder} from "@/service/ruby/ruby_generator";

export const variables_set = (
  block: Blockly.Block,
  generator: rubyGenerator,
) => {
  // Variable setter.
  const argument0 = generator.valueToCode(block, 'VALUE', RubyOrder.NONE) || '0';
  const varName = generator.getVariableName(block.getFieldValue('VAR'));
  return varName + ' = ' + argument0 + '\n';
}

export const generators = {
  variables_set
}