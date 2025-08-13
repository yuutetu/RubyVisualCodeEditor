import * as io from './io'
import * as variables from './variables'
import * as string from './string'
import * as logic from './logic';

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

// 優先順位定数をオブジェクトで定義
export const RUBY_ORDER = {
  ATOMIC: 0,
  UNARY: 1,
  MULTIPLICATIVE: 2,
  ADDITIVE: 3,
  RELATIONAL: 4,
  EQUALITY: 5,
  LOGICAL_AND: 6,
  LOGICAL_OR: 7,
  NONE: 99,
} as const;

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
} satisfies Record<string, (block: Block, generator: RubyGenerator) => (string | [string, number] | null) | (() => (string | [string, number] | null))>;

for (const [name, fn] of Object.entries(generators)) {
  rubyGenerator.forBlock[name] = fn
}