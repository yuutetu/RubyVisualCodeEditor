import * as Blockly from 'blockly/core';

/**
 * Ruby の演算子優先度。
 * 値が大きいほど結合が「強い」イメージ（Blockly の慣習に準拠）
 * 参考: https://docs.ruby-lang.org/ja/latest/doc/spec=2foperator.html
 */
export const RubyOrder = {
  ATOMIC: 0,              // リテラル、変数、メソッド呼び出し（引数なし）
  MEMBER: 1,              // obj[index], obj.method
  UNARY: 2,               // ! ~ + -
  MULTIPLICATIVE: 3,      // * / %
  ADDITIVE: 4,            // + -
  BIT_SHIFT: 5,           // << >>
  BIT_AND: 6,             // &
  BIT_XOR: 7,             // ^
  BIT_OR: 8,              // |
  RANGE: 9,               // .. ...
  RELATIONAL: 10,         // < <= > >=
  EQUALITY: 11,           // == != === !== <=>
  LOGICAL_AND: 12,        // &&
  LOGICAL_OR: 13,         // ||
  CONDITIONAL: 14,        // ?:（Ruby でも三項は存在）
  ASSIGNMENT: 15,         // = += -= *= /= %= etc.
  NONE: 99,               // 文として使う（括弧不要の最上位）
} as const;
export type RubyOrder = (typeof RubyOrder)[keyof typeof RubyOrder];

/** Ruby の予約語（小文字のみ。NameDB は大小区別せず衝突回避します） */
const RESERVED_WORDS = `
__ENCODING__ __LINE__ __FILE__
BEGIN END
alias and begin break case class def defined? do else elsif end ensure false
for if in module next nil not or redo rescue retry return self super then true
undef unless until when while yield
`;

/** Ruby 用ジェネレーター本体 */
export class RubyGenerator extends Blockly.Generator {
  INDENT = '  '; // Ruby 慣習の 2 スペース
  /** Ruby は 0-based index を採用 */
  /** Blockly の getAdjusted ヘルパに使う想定。 */
  oneBasedIndex = false;

  /** 文字列連結演算子 */
  FORCE_STRING_CONCAT = ' + ';

  /** ファイル先頭に置く require 等（順序維持） */
  private headerSet: Set<string> = new Set();

  constructor(name = 'Ruby') {
    super(name);
    this.isInitialized = false;

    // ステートメント用の接頭辞/接尾辞（オプション）
    this.STATEMENT_PREFIX = '';
    this.STATEMENT_SUFFIX = '';
    this.DEFINE_STATEMENT_PREFIX = false;
    this.DEFINE_STATEMENT_SUFFIX = false;

    // コード生成中に利用する “定義領域”
    this['definitions_'] = Object.create(null);
    this['variables_'] = Object.create(null);

    // 演算子の優先度テーブル
    this.ORDER_ATOMIC = RubyOrder.ATOMIC;
    this.ORDER_MEMBER = RubyOrder.MEMBER;
    this.ORDER_UNARY = RubyOrder.UNARY;
    this.ORDER_MULTIPLICATIVE = RubyOrder.MULTIPLICATIVE;
    this.ORDER_ADDITIVE = RubyOrder.ADDITIVE;
    this.ORDER_LOGICAL_AND = RubyOrder.LOGICAL_AND;
    this.ORDER_LOGICAL_OR = RubyOrder.LOGICAL_OR;
    this.ORDER_RELATIONAL = RubyOrder.RELATIONAL;
    this.ORDER_EQUALITY = RubyOrder.EQUALITY;
    this.ORDER_CONDITIONAL = RubyOrder.CONDITIONAL;
    this.ORDER_ASSIGNMENT = RubyOrder.ASSIGNMENT;
    this.ORDER_NONE = RubyOrder.NONE;

    // Ruby は行末セミコロン不要
    this['lineEnding_'] = '\n';
  }

  /** ワークスペースごとの初期化。必ず最初に呼ばれる。 */
  init(workspace: Blockly.Workspace): void {
    super.init(workspace);

    // NameDB 初期化（変数/関数/ラベルの衝突回避に使用）
    if (!this.nameDB_) {
      this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_, this.getDistinctName.bind(this));
    } else {
      this.nameDB_.reset();
    }
    this.nameDB_.setVariableMap(workspace.getVariableMap());

    // 収集用の領域をクリア
    (this as any)['definitions_'] = Object.create(null);
    (this as any)['variables_'] = Object.create(null);
    this.headerSet.clear();

    // 変数宣言（Ruby は事前宣言不要だが、必要ならここで初期化式を作る）
    const variables = workspace.getAllVariables();
    if (variables.length) {
      // デフォルトでは何もしない。必要なら初期化例:
      // const decls = variables.map(v => `${this.nameDB_.getName(v.getId(), Blockly.Names.NameType.VARIABLE)} = nil`);
      // (this as any)['definitions_']['variables'] = decls.join('\n');
    }
  }

  /** 生成の最終段。ヘッダ(require等) と 本文 を結合して返す。 */
  finish(code: string): string {
    const definitions = (this as any)['definitions_'] as Record<string, string>;
    const defLines = Object.values(definitions);
    const headerLines = Array.from(this.headerSet);

    const all = [...headerLines, ...defLines, code].filter(Boolean);
    // 末尾に余計な改行がついても Ruby は問題ないが、一応整える
    return all.join('\n').replace(/\s+$/s, '\n');
  }

  /** コードの先頭に `require` を追加する（順序維持） */
  require(lib: string) {
    this.headerSet.add(`require '${lib}'`);
  }

  /** 改行 + インデント */
  scrub_(block: Blockly.Block, code: string, thisOnly = false): string {
    if (code === null) return '';
    let commentCode = '';

    // ブロックに付いたコメントを先頭に変換
    const comment = Blockly.utils.wrap(block.getCommentText() ?? '', 80);
    if (comment) {
      commentCode += comment
        .split('\n')
        .map((l) => `# ${l}`)
        .join('\n') + '\n';
    }

    // 値接続のブロックはコメントのみ追加し、本体は親側で組み込む
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    let nextCode = '';
    if (!thisOnly && nextBlock) {
      nextCode = '\n' + this.blockToCode(nextBlock);
    }
    return commentCode + code + nextCode;
  }

  /** 裸の値（式のみの文）を、Ruby では捨てる or puts するかの方針。ここではそのまま捨てる。 */
  scrubNakedValue(line: string): string {
    // 何もしない（副作用なしの式は落とす）。ログしたいなら `puts ( ... )` にしてもOK
    return line + '\n';
  }

  /** 文字列のクォート（単一引用符）。内部の ' はエスケープ */
  quote_(string: string): string {
    string = string.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `'${string}'`;
  }

  /** 複数行文字列（Ruby のヒアドキュメントを使わず、手軽に行連結） */
  multiline_quote_(string: string): string {
    const lines = string.split(/\r?\n/).map((l) => this.quote_(l));
    if (lines.length === 1) return lines[0];
    // "['a','b'].join(\"\\n\")" にする
    return `[${lines.join(', ')}].join("\\n")`;
  }

  /** インデント付与 */
  indent(text: string): string {
    if (!text) return '';
    return text
      .split('\n')
      .map((l) => (l ? this.INDENT + l : l))
      .join('\n');
  }

  /** インデックス調整（Blockly 慣習のヘルパ）。Ruby は 0-start。 */
  getAdjusted(
    block: Blockly.Block,
    atId: string,
    opt_delta = 0,
    opt_negate = false,
    opt_order?: number
  ): [string, number] {
    let delta = opt_delta;
    // oneBasedIndex=false なので、Blockly の「一番左/右」や 1-based 設定があれば補正
    if (this.oneBasedIndex) delta -= 1;

    let at = this.valueToCode(block, atId, opt_order ?? RubyOrder.ADDITIVE) || '0';
    if (delta) {
      const op = delta > 0 ? '+' : '-';
      const abs = Math.abs(delta);
      at = `(${at} ${op} ${abs})`;
    }
    if (opt_negate) {
      at = `(-${at})`;
    }
    return [at, RubyOrder.UNARY];
  }

  /** 予約語 */
  get RESERVED_WORDS_(): string {
    return RESERVED_WORDS;
  }
}