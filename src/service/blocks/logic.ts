import * as Blockly from 'blockly/core'

// Tool: https://google.github.io/blockly-samples/examples/developer-tools/index.html
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "call_method",
    "tooltip": "Call method",
    "helpUrl": "",
    "message0": "%1.%2(%3)",
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
    "output": null,
    "colour": 270,
  },
  {
    "type": "times",
    "tooltip": "Repeat a block multiple times",
    "helpUrl": "",
    "message0": "repeat %1 index variable %2 times %3",
    "args0": [
      {
        "type": "input_value",
        "name": "TIMES",
      },
      {
        "type": "field_input",
        "name": "INDEX",
        "text": "i"
      },
      {
        "type": "input_statement",
        "name": "DO",
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
  },
  {
    "type": "lambda",
    "message0": "lambda %1 do %2 return %3",
    "args0": [
      {
        "type": "field_input",
        "name": "PARAMS",
        "text": ""
      },
      {
        "type": "input_statement",
        "name": "BODY",
      },
      {
        "type": "input_value",
        "name": "RETURN",
        "align": "RIGHT",
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Ruby lambda",
    "helpUrl": ""
  },
  {
    "type": "call_method_with_proc",
    "tooltip": "Call method with a Proc",
    "helpUrl": "",
    "message0": "%1.%2(proc %3)",
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
        "name": "Proc",
      }
    ],
    "output": null,
    "colour": 270,
  },
  {
    "type": "custom_code",
    "tooltip": "Custom code block",
    "helpUrl": "",
    "message0": "%1",
    "args0": [
      {
        "type": "field_input",
        "name": "CODE",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 270,
  }
])

Blockly.common.defineBlocks(blocks)