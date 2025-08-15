import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "io_read_line",
    "tooltip": "Read Line",
    "helpUrl": "",
    "message0": "read line",
    "colour": 270
  },
  {
    "type": "io_read_number",
    "tooltip": "Read Number",
    "helpUrl": "",
    "message0": "read number",
    "colour": 270
  },
  {
    "type": "io_puts",
    "tooltip": "Print",
    "helpUrl": "",
    "message0": "puts %1",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
  },
  {
    "type": "io_read_numbers",
    "tooltip": "Read multiple numbers",
    "helpUrl": "",
    "message0": "read numbers of line",
    "colour": 270,
  },
])

Blockly.common.defineBlocks(blocks)
