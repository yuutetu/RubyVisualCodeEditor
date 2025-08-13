import * as io from './io'
import * as variables from './variables'
import * as string from './string'
import * as logic from './logic';
import * as math from './math';
import * as array from './array';

import * as Blockly from 'blockly/core';
import {Block, CodeGenerator} from "blockly/core";

export class RubyGenerator extends CodeGenerator {
  // nameDB_: Blockly.Names;
  // definitions_: Record<string, string>;
  // functionNames_: Record<string, string>;
  // blockToCode: (block: Blockly.Block | null) => string;
  // prefixLines: (text: string, prefix: string) => string;
  // scrub_: (block: Blockly.Block, code: string) => string;
  // quote_: (string: string) => string;
  // RESERVED_WORDS_: string;

  getReservedWords() {
    return this.RESERVED_WORDS_;
  }

  getDefinitions() {
    return this.definitions_ || {};
  }

  setDefinitions(definitions: Record<string, string>) {
    this.definitions_ = definitions;
  }
  setFunctionNames(functionNames: Record<string, string>) {
    this.functionNames_ = functionNames;
  }

  resetNameDB() {
    if (this.nameDB_) {
      this.nameDB_.reset();
    }
  }

  // Generator実装用helper関数
  // 引用符処理
  quote_(string: string) {
    return `"${string.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
}

// Generator インスタンス作成
export const rubyGenerator = new RubyGenerator('Ruby');

// 優先順位定数をオブジェクトで定義。以下のルールに従って定義する
export const RUBY_ORDER = {
  ATOMIC: 0,             // 0 "" ...
  MEMBER: 2,             // . []
  FUNCTION_CALL: 2,      // ()
  EXPONENTIATION: 3,     // **
  LOGICAL_NOT: 4,        // !
  UNARY_SIGN: 4,         // + -
  BITWISE_NOT: 4,        // ~
  MULTIPLICATIVE: 5,     // * / // %
  ADDITIVE: 6,           // + -
  BITWISE_SHIFT: 7,      // << >>
  BITWISE_AND: 8,        // &
  BITWISE_XOR: 9,        // ^
  BITWISE_OR: 9,         // |
  RELATIONAL: 11,        // <, <=, >, >=, <>, !=, ==
  LOGICAL_AND: 13,       // &&
  LOGICAL_OR: 14,        // ||
  CONDITIONAL: 15,       // if unless while until
  NONE: 99,              // (...)
} as const;

export type RubyOrder = typeof RUBY_ORDER[keyof typeof RUBY_ORDER];

// 初期化処理（変数名管理など）
rubyGenerator.init = (workspace) => {
  rubyGenerator.nameDB_ = new Blockly.Names(rubyGenerator.getReservedWords());
  rubyGenerator.nameDB_.setVariableMap(workspace.getVariableMap());
  rubyGenerator.setDefinitions(Object.create({}))
  rubyGenerator.setFunctionNames(Object.create({}))
};

// 終了処理（require などをコード先頭に追加）
rubyGenerator.finish = (code) => {
  const requires = Object.values(rubyGenerator.getDefinitions() || {}).join('\n');
  rubyGenerator.resetNameDB();
  return [requires, code].filter(Boolean).join('\n\n');
};

// コメントや次ブロックの接続処理
rubyGenerator.scrub_ = (block, code) => {
  const comment = block.getCommentText();
  const commentCode = comment ? rubyGenerator.prefixLines(`# ${comment}`, '') : '';
  const nextBlock = block.nextConnection?.targetBlock();
  const nextCode = nextBlock ? rubyGenerator.blockToCode(nextBlock) : '';
  return commentCode + code + nextCode;
};

const generators = {
  ...io.generators,
  ...variables.generators,
  ...string.generators,
  ...logic.generators,
  ...math.generators,
  ...array.generators,
} satisfies Record<string, (block: Block, generator: RubyGenerator) => (string | [string, number] | null) | (() => (string | [string, number] | null))>;

for (const [name, fn] of Object.entries(generators)) {
  rubyGenerator.forBlock[name] = fn
}