import * as Blockly from 'blockly/core'
import {RUBY_ORDER, RubyGenerator} from "./ruby";


export const controls_if = (
  block: Blockly.Block,
  generator: RubyGenerator,
): string => {
  // If statement.
  const condition = generator.valueToCode(block, 'IF0', RUBY_ORDER.NONE) || 'false';
  const branch = generator.statementToCode(block, 'DO0') || '';
  let code = `if ${condition} then\n${branch}`;

  // else if branches
  let n = 1;
  while (block.getInput(`IF${n}`)) {
    const elseCondition = generator.valueToCode(block, `IF${n}`, RUBY_ORDER.NONE) || 'false';
    const elseBranch = generator.statementToCode(block, `DO${n}`) || '';
    code += `\nelsif ${elseCondition} then\n${elseBranch}`;
    n++;
  }

  // else branch
  const elseBranch = generator.statementToCode(block, 'ELSE');
  if (elseBranch) {
    code += `\nelse\n${elseBranch}`;
  }

  code += '\nend';
  return code;
}

export const logic_compare = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Comparison operator.
  const OPERATORS: Record<string, string> = {
    EQ: '==',
    NEQ: '!=',
    LT: '<',
    LTE: '<=',
    GT: '>',
    GTE: '>=',
  };
  const operator = OPERATORS[block.getFieldValue('OP')];
  const argument0 = generator.valueToCode(block, 'A', RUBY_ORDER.RELATIONAL) || '0';
  const argument1 = generator.valueToCode(block, 'B', RUBY_ORDER.RELATIONAL) || '0';
  return [`${argument0} ${operator} ${argument1}`, RUBY_ORDER.RELATIONAL];
}

export const call_bool_method = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Call a boolean method on an object.
  const object = generator.valueToCode(block, 'Object', RUBY_ORDER.NONE) || 'nil';
  const method = block.getFieldValue('Method') || '';
  const args = generator.valueToCode(block, 'Args', RUBY_ORDER.NONE) || '';
  return [`${object}.${method}?(${args})`, RUBY_ORDER.ATOMIC];
}

export const call_number_method = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Call a number method on an object.
  const object = generator.valueToCode(block, 'Object', RUBY_ORDER.NONE) || 'nil';
  const method = block.getFieldValue('Method') || '';
  const args = generator.valueToCode(block, 'Args', RUBY_ORDER.NONE) || '';
  return [`${object}.${method}(${args})`, RUBY_ORDER.ATOMIC];
}

export const call_string_method = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Call a string method on an object.
  const object = generator.valueToCode(block, 'Object', RUBY_ORDER.NONE) || 'nil';
  const method = block.getFieldValue('Method') || '';
  const args = generator.valueToCode(block, 'Args', RUBY_ORDER.NONE) || '';
  return [`${object}.${method}(${args})`, RUBY_ORDER.ATOMIC];
}

export const generators = {
  controls_if,
  logic_compare,
  call_bool_method,
  call_number_method,
  call_string_method,
}