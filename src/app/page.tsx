'use client'
import {useBlocklyWorkspace} from "react-blockly"
import '@/service/blocks/blocks'
import {useCallback, useRef, useState} from "react";
import {UseBlocklyProps} from "react-blockly/dist/BlocklyWorkspaceProps";
import {rubyGenerator} from "@/service/ruby/ruby";
import { EditorView } from '@codemirror/view'
import dynamic from "next/dynamic";

const ReactCodeMirror = dynamic(() => import('@uiw/react-codemirror'), { ssr: false });

export default function Home() {
  const ref = useRef<HTMLDivElement | null>(null)
  const {workspace: ws} = useBlocklyWorkspace({
    ref: ref,
    initialXml: "<xml></xml>",
    toolboxConfiguration: MY_TOOLBOX,
    workspaceConfiguration: {},
    // WARN: fix type
  } as UseBlocklyProps)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [code, setCode] = useState('')

  const openDrawerAndGenerate = useCallback(() => {
    if (!ws) return
    console.log('Generating code from Blockly workspace:', ws)
    const generated = rubyGenerator.workspaceToCode(ws)
    setCode(`# Generated for AtCoder A\n${generated}`)
    setDrawerOpen(true);
  }, [ws]);

  const copy = useCallback(() => {
    if (!code) return;
    console.log(code)
    navigator.clipboard.writeText(code);
  }, [code]);

  return (
    <div className="h-dvh flex flex-col">
      <header className="p-2 flex justify-between border-b">
        Ruby Block Editor
        <button className="rounded-lg" onClick={() => openDrawerAndGenerate()}>
          Gen Ruby Code
        </button>
      </header>
      <div className="flex-1 z-0">
        <div ref={ref} className="w-full h-full" />
      </div>
      <footer className="fixed inset-x-0 bottom-0 bg-black border-t
                   flex gap-2 p-2"
        style={{paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)'}}>
        <button className="flex-1 h-12 rounded-lg" onClick={() => openDrawerAndGenerate()}>
          コード表示
        </button>
      </footer>
      {/* 全画面 Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="p-2 flex items-center justify-between border-b bg-black"
               style={{ paddingBottom: 'calc(env(safe-area-inset-bottom)/4)' }}>
            <span>Ruby コード</span>
            <div className="space-x-2">
              <button onClick={copy}>コピー</button>
              <button onClick={() => setDrawerOpen(false)}>閉じる</button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {/* CodeMirror 本体（読み取り専用 + 折り返し） */}
            <ReactCodeMirror
              value={code}
              className="h-full bg-gray-100 text-gray-800"
              extensions={[
                EditorView.editable.of(false),
                EditorView.lineWrapping
              ]}
              basicSetup={{
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
                foldGutter: true,
                lineNumbers: true,
              }}
              readOnly
              theme={undefined /* システムに合わせたい場合は自前で切替 */}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const MY_TOOLBOX = `
<xml>
  <category name="IO">
    <block type="io_read_line"/>
<!--    <block type="io_puts"/>-->
  </category>
  <category name="値/演算">
<!--    <block type="math_number"/>-->
    <block type="variables_set"/>
<!--    <block type="variables_get"/>-->
<!--    <block type="math_arithmetic"/>-->
<!--    <block type="logic_compare"/>-->
<!--    <block type="text_join"/>-->
  </category>
<!--  <category name="制御">-->
<!--    <block type="controls_if"/>-->
<!--  </category>-->
</xml>
`