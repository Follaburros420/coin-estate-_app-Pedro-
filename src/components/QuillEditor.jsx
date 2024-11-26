import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
// Full toolbar options
const toolbarOptions = [
  [{ header: '1' }, { header: '2' }, { font: [] }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ align: [] }],
  ['link', 'image', 'video', 'formula'],
  ['clean'], // Clear formatting
];

const QuillEditor = ({ register, label, onChange, value, error, style }) => {


  const rowHeight = 20; // Approximate height of one row in pixels
  const numberOfRows = 10;
  const editorHeight = rowHeight * numberOfRows;
  return (
    <div className='myElement'>
      <label htmlFor="">{label}</label>
      <ReactQuill
        value={value}
        onChange={onChange}
        {...register}
        modules={{
          toolbar: toolbarOptions,
        }}
        placeholder="Start typing here..."
        style={{ height: editorHeight, fontSize:'16px', background:'#fff !important', overflow:'auto', ...style }}
      />
      {error?.message && (
        <span className="text-[red] text-xs">{error?.message}</span>
      )}
    </div>
  );
};

export default QuillEditor;
