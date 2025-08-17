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

  if (block.getInput('ELSE')) {
    const elseBranch = generator.statementToCode(block, 'ELSE');
    code += `\nelse\n${elseBranch}`;
  }

  code += '\nend\n';
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

const call_method = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Call a number method on an object.
  const object = generator.valueToCode(block, 'Object', RUBY_ORDER.NONE) || 'nil';
  const method = block.getFieldValue('Method') || '';
  const args = generator.valueToCode(block, 'Args', RUBY_ORDER.NONE) || '';
  if (args === '') {
    return [`${object}.${method}`, RUBY_ORDER.ATOMIC];
  }
  return [`${object}.${method}(${args})`, RUBY_ORDER.ATOMIC];
}

const times = (
  block: Blockly.Block,
  generator: RubyGenerator,
): string => {
  // Loop a specific number of times.
  const times = generator.valueToCode(block, 'TIMES', RUBY_ORDER.NONE) || '0';
  const index = block.getFieldValue('INDEX') || 'i';
  const branch = generator.statementToCode(block, 'DO') || '';
  return `${times}.times do |${index}|\n${branch}end\n`;
}

const lambda = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Lambda function definition.
  const params = block.getFieldValue('PARAMS') || '';
  const body = generator.statementToCode(block, 'BODY') || '';
  const returnVal = generator.valueToCode(block, 'RETURN', RUBY_ORDER.NONE) || 'nil';
  let code = '';
  if (body === '') {
    code = `Proc.new { |${params}| ${returnVal}}`;
  } else {
    code = `Proc.new { |${params}| \n${body}\nreturn ${returnVal}\n}`;
  }
  return [code, RUBY_ORDER.FUNCTION_CALL];
}

const call_method_with_proc = (
  block: Blockly.Block,
  generator: RubyGenerator,
): [string, number] => {
  // Call a method with a Proc.
  const object = generator.valueToCode(block, 'Object', RUBY_ORDER.NONE) || 'nil';
  const method = block.getFieldValue('Method') || '';
  const proc = generator.valueToCode(block, 'Proc', RUBY_ORDER.NONE) || '(Proc.new { |x| false })';
  return [`${object}.${method}(&${proc})`, RUBY_ORDER.ATOMIC];
}

const custom_code = (block: Blockly.Block, generator: RubyGenerator): string => {
  // Custom code block.
  const code = block.getFieldValue('CODE') || '';
  return `${code}\n`;
}

export const generators = {
  controls_if,
  logic_compare,
  call_method,
  times,
  lambda,
  call_method_with_proc,
  custom_code,
}