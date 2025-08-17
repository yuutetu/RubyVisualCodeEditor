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
      },
      {
        "type": "input_value",
        "name": "Index",
      },
    ],
    "output": null,
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
      },
      {
        "type": "input_value",
        "name": "Index",
      },
      {
        "type": "input_value",
        "name": "Count",
      },
    ],
    "output": null,
    "colour": 270,
  }
])

Blockly.common.defineBlocks(blocks)