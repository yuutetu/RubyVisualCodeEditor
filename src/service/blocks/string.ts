import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "string_slice",
    "tooltip": "Get slice from array",
    "helpUrl": "",
    "message0": "slice %1 from %2",
    "args0": [
      {
        "type": "input_value",
        "name": "String",
        "check": "String"
      },
      {
        "type": "field_input",
        "name": "range",
        "check": "String"
      },
    ],
    "output": "String",
    "colour": 270,
  }
])

Blockly.common.defineBlocks(blocks)