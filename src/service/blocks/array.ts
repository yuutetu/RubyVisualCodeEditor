import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "array_get_index",
    "tooltip": "Get an item from array",
    "helpUrl": "",
    "message0": "get item %1 from array %2",
    "args0": [
      {
        "type": "field_input",
        "name": "Index",
        "check": "Number",
        "text": "0"
      },
      {
        "type": "input_value",
        "name": "Array",
        "check": "Array"
      }
    ],
    "output": "String",
    "colour": 270,
  },
  {
    "type": "array_slice",
    "tooltip": "Get slice from array",
    "helpUrl": "",
    "message0": "slice %1 from %2",
    "args0": [
      {
        "type": "input_value",
        "name": "Array",
        "check": "Array"
      },
      {
        "type": "field_input",
        "name": "Range",
        "check": "String"
      },
    ],
    "output": "Array",
    "colour": 270,
  }
])

Blockly.common.defineBlocks(blocks)