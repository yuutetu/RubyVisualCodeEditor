'use client'
import {BlocklyWorkspace} from "react-blockly"
import '@/service/blocks/blocks'

export default function Home() {
  return (
    <div className="h-dvh flex flex-col">
      <header className="p-2 flex justify-between border-b">
        Ruby Block Editor
      </header>
      <div className="flex-1">
        <BlocklyWorkspace
          initialXml="<xml></xml>"
          toolboxConfiguration={MY_TOOLBOX}
          className="w-full h-full"
          workspaceConfiguration={{}}
        />
      </div>
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