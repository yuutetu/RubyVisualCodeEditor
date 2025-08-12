import * as Blockly from 'blockly/core';
export const Ruby = new Blockly.Generator('Ruby');
export const RUBY_ORDER_ATOMIC = 0;
Ruby.scrub_ = function(block, code) {
  const next = block.nextConnection && block.nextConnection.targetBlock();
  return code + (next ? this.blockToCode(next) : '');
};
export default Ruby;