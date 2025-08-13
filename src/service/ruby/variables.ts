import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";

export const variables_set = (
  block: Blockly.Block,
  generator: RubyGenerator,
) => {
  // Variable setter.
  const argument0 = generator.valueToCode(block, 'VALUE', RUBY_ORDER.NONE) || '0';
  const varName = generator.getVariableName(block.getFieldValue('VAR'));
  return varName + ' = ' + argument0 + '\n';
}

export const generators = {
  variables_set
}