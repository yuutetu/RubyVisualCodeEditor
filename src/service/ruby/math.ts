import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator, RubyOrder} from "./ruby";

const math_number = (block: Blockly.Block, generator: RubyGenerator): [string, number] => {
  // Numeric value.
  const code = block.getFieldValue('NUM') || '0';
  return [code, RUBY_ORDER.ATOMIC];
}

const math_arithmetic = (block: Blockly.Block, generator: RubyGenerator): [string, number] => {
  // Arithmetic operations.
  const OPERATORS: Record<string, [string, RubyOrder]> = {
    ADD: ['+', RUBY_ORDER.ADDITIVE],
    MINUS: ['-', RUBY_ORDER.ADDITIVE],
    MULTIPLY: ['*', RUBY_ORDER.MULTIPLICATIVE],
    DIVIDE: ['/', RUBY_ORDER.MULTIPLICATIVE],
    POWER: ['**', RUBY_ORDER.EXPONENTIATION],
  }

  const operator = OPERATORS[block.getFieldValue('OP')];
  const argument0 = generator.valueToCode(block, 'A', operator[1]) || '0';
  const argument1 = generator.valueToCode(block, 'B', operator[1]) || '0';
  return [`${argument0} ${operator[0]} ${argument1}`, operator[1]];
}

export const generators = {
  math_number,
  math_arithmetic,
}