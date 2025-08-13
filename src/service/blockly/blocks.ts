// // lib/blockly/blocks_min.ts
// import * as Blockly from 'blockly/core';
// import Ruby, {RUBY_ORDER_ATOMIC} from './ruby_generator';
//
// // ID/Read Line
// Blockly.Blocks['io_read_line'] = {
//   init() {
//     this.appendDummyInput().appendField('整数をまとめて読む tokens');
//     this.setOutput('number');
//     this.setColour(20);
//   }
// };
// Ruby['io_read_tokens'] = () =>
//   'gets.chomp\n';
//
// // 2) puts 出力（式を一つ）
// // Blockly.Blocks['io_puts'] = {
// //   init() {
// //     this.appendValueInput('EXPR').appendField('puts');
// //     this.setPreviousStatement(true);
// //     this.setNextStatement(true);
// //     this.setColour(20);
// //   }
// // };
// // (Ruby as any)['io_puts'] = (block:any) => {
// //   const expr = Ruby.valueToCode(block, 'EXPR', RUBY_ORDER_ATOMIC) || '0';
// //   return `puts ${expr}\n`;
// // };
//
// // Preset/Variable Get and Set
// Ruby['variables_get'] = function(block) {
//   return [block.getFieldValue('VAR'), RUBY_ORDER_ATOMIC];
// };
//
// Ruby['variables_set'] = function(block) {
//   // Variable setter.
//   let argument0 = Ruby.valueToCode(block, 'VALUE',
//       RUBY_ORDER_ATOMIC) || '0';
//   let varName = block.getFieldValue('VAR');
//   return varName + ' = ' + argument0 + '\n';
// };
