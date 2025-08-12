// lib/blockly/blocks_min.ts
import * as Blockly from 'blockly/core';
import Ruby, {RUBY_ORDER_ATOMIC} from './ruby_generator';

// 1) トークン読み（A問題想定：整数複数）
Blockly.Blocks['io_read_tokens'] = {
  init() {
    this.appendDummyInput().appendField('整数をまとめて読む tokens');
    this.setPreviousStatement(true); this.setNextStatement(true);
    this.setColour(20);
  }
};
(Ruby as any)['io_read_tokens'] = () =>
  'tokens = STDIN.read.split.map!(&:to_i)\n';

// 2) puts 出力（式を一つ）
Blockly.Blocks['io_puts'] = {
  init() {
    this.appendValueInput('EXPR').appendField('puts');
    this.setPreviousStatement(true); this.setNextStatement(true);
    this.setColour(20);
  }
};
(Ruby as any)['io_puts'] = (block:any) => {
  const expr = Ruby.valueToCode(block, 'EXPR', RUBY_ORDER_ATOMIC) || '0';
  return `puts ${expr}\n`;
};

(Ruby as any)['math_arithmetic'] = (block:any) => {
  const opMap:any = { ADD:'+', MINUS:'-', MULTIPLY:'*', DIVIDE:'/', POWER:'**' };
  const op = opMap[block.getFieldValue('OP')];
  const A = Ruby.valueToCode(block, 'A', RUBY_ORDER_ATOMIC) || '0';
  const B = Ruby.valueToCode(block, 'B', RUBY_ORDER_ATOMIC) || '0';
  return [`(${A} ${op} ${B})`, RUBY_ORDER_ATOMIC];
};