import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "range",
    "tooltip": "Create a range of numbers",
    "helpUrl": "",
    "message0": "range from %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "FROM",
      },
      {
        "type": "input_value",
        "name": "TO",
      }
    ],
    "output": null,
    "colour": 270,
  }
])

Blockly.common.defineBlocks(blocks)