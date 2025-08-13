import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "io_read_line",
    "tooltip": "Read Line",
    "helpUrl": "",
    "message0": "read line",
    "output": "String",
    "colour": 270
  }
])

Blockly.common.defineBlocks(blocks)