import React, { useRef, useState } from 'react'
// import { Editor } from '@toast-ui/react-editor'
// import '@toast-ui/editor/dist/toastui-editor.css'
import { Flex, Input } from 'antd'
const { TextArea } = Input

const ToastEditor = ({
  editorTextData,
  setEditorTextData,
  onChange,
  value,
}) => {
  const editorRef = useRef()
  //   const [editorTextData, setEditorTextData] = useState()

  // const onChangeGetHTML = () => {
  //   // 에디터에 입력된 내용을 HTML 태그 형태로 취득
  //   const data = editorRef.current.getInstance().getHTML()
  //   // data에 담기
  //   console.log('$$$에디터data', data)
  //   setEditorTextData(data)
  // }

  const handleChange = (e) => {
    // console.log('Change:', e.target.value)
    onChange(e.target.value)
    // setEditorTextData(e.target.value)
  }
  return (
    <>
      <TextArea
        showCount
        maxLength={100}
        value={value}
        onChange={handleChange}
        placeholder="disable resize"
        style={{
          height: 120,
          resize: 'none',
        }}
      />
    </>
  )

  // <Editor
  //   toolbarItems={[
  //     // 툴바 옵션 설정
  //     ['heading', 'bold', 'italic', 'strike'],
  //     // ['hr', 'quote'],
  //     ['ul', 'ol', 'task', 'indent', 'outdent'],
  //     // ['table', 'image', 'link'],
  //     // ['code', 'codeblock'],
  //   ]}
  //   height="240px" // 에디터 창 높이
  //   //   initialValue="" // 에디터 초기값
  //   initialEditType="wysiwyg" // 기본 에디터 타입 (or wysiwyg)
  //   hideModeSwitch="true" // 하단 markdown 모드와 wysiwyg 모드 간 변경 버튼 숨김 여부
  //   //   previewStyle="vertical" // 미리보기 스타일 (or tab) (verttical은 양쪽이 나뉨)
  //   ref={editorRef} // ref 참조
  //   onChange={onChangeGetHTML} // onChange 이벤트
  // ></Editor>
}

export default ToastEditor
