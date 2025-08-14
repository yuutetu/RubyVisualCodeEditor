import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "get_index",
    "tooltip": "Get an item from array",
    "helpUrl": "",
    "message0": "%1[%2]",
    "args0": [

      {
        "type": "input_value",
        "name": "Array",
        "check": ["String", "Array"],
      },
      {
        "type": "input_value",
        "name": "Index",
        "check": "Number",
      },
    ],
    "output": "String",
    "colour": 270,
  },
  {
    "type": "slice",
    "tooltip": "Get slice from array",
    "helpUrl": "",
    "message0": "%1[%2,%3]",
    "args0": [
      {
        "type": "input_value",
        "name": "String",
        "check": ["String", "Array"],
      },
      {
        "type": "input_value",
        "name": "Index",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "Count",
        "check": "Number"
      },
    ],
    "output": "String",
    "colour": 270,
  }
])

Blockly.common.defineBlocks(blocks)