import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "call_bool_method",
    "tooltip": "Call method",
    "helpUrl": "",
    "message0": "boolean %1.%2?(%3)",
    "args0": [
      {
        "type": "input_value",
        "name": "Object",
      },
      {
        "type": "field_input",
        "name": "Method",
        "text": "",
      },
      {
        "type": "input_value",
        "name": "Args",
      }
    ],
    "output": "Boolean",
    "colour": 270,
  },
  {
    "type": "call_number_method",
    "tooltip": "Call method",
    "helpUrl": "",
    "message0": "number %1.%2(%3)",
    "args0": [
      {
        "type": "input_value",
        "name": "Object",
      },
      {
        "type": "field_input",
        "name": "Method",
        "text": "",
      },
      {
        "type": "input_value",
        "name": "Args",
      }
    ],
    "output": "Number",
    "colour": 270,
  },
  {
    "type": "call_string_method",
    "tooltip": "Call method",
    "helpUrl": "",
    "message0": "string %1.%2(%3)",
    "args0": [
      {
        "type": "input_value",
        "name": "Object",
      },
      {
        "type": "field_input",
        "name": "Method",
        "text": "",
      },
      {
        "type": "input_value",
        "name": "Args",
      }
    ],
    "output": "String",
    "colour": 270,
  },
  {
    "type": "times",
    "tooltip": "Repeat a block multiple times",
    "helpUrl": "",
    "message0": "repeat %1 times %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TIMES",
        "check": "Number"
      },
      {
        "type": "input_statement",
        "name": "DO",
        "check": null
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
  }
])

Blockly.common.defineBlocks(blocks)