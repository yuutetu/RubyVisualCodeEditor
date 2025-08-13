import * as io from './io'
import * as variables from './variables'

import * as Blockly from 'blockly/core';
import {Block, CodeGenerator} from "blockly/core";

interface RubyGenerator extends CodeGenerator {
  nameDB_: Blockly.Names;
  definitions_: Record<string, string>;
  functionNames_: Record<string, string>;
  blockToCode: (block: Blockly.Block | null) => string;
  prefixLines: (text: string, prefix: string) => string;
  scrub_: (block: Blockly.Block, code: string) => string;
  quote_: (string: string) => string;
  RESERVED_WORDS_: string;
}

// Generator インスタンス作成
export const rubyGenerator = new Blockly.Generator('Ruby') as RubyGenerator;

// 優先順位定数をオブジェクトで定義
const RUBY_ORDER = {
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

// Ruby の予約語を設定
rubyGenerator.addReservedWords(
  'alias,and,BEGIN,break,case,class,def,defined?,do,else,elsif,end,ensure,false,for,if,in,module,next,nil,not,or,redo,rescue,retry,return,self,super,then,true,undef,unless,until,when,while,yield'
);

// 初期化処理（変数名管理など）
rubyGenerator.init = (workspace) => {
  rubyGenerator.nameDB_ = new Blockly.Names(rubyGenerator.RESERVED_WORDS_);
  rubyGenerator.nameDB_.setVariableMap(workspace.getVariableMap());
  rubyGenerator.definitions_ = Object.create({});
  rubyGenerator.functionNames_ = Object.create({});
};

// 終了処理（require などをコード先頭に追加）
rubyGenerator.finish = (code) => {
  const requires = Object.values(rubyGenerator.definitions_ || {}).join('\n');
  rubyGenerator.nameDB_.reset();
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

// 文字列の引用符処理（シンプルなダブルクォート）
rubyGenerator.quote_ = (string) =>
  `"${string.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

// ワークスペース全体のコード生成
rubyGenerator.workspaceToCode = (workspace) => {
  if (!workspace) return '';
  rubyGenerator.init(workspace);
  const topBlocks = workspace.getTopBlocks(true);
  const code = rubyGenerator.blockToCode(topBlocks[0] || null) || '';
  return rubyGenerator.finish(code);
};

const generators = {
  ...io.generators,
  ...variables.generators,
}
for (const name in generators) {
  rubyGenerator.forBlock[name] = generators[name];
}