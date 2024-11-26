

import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #B8B8B8',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


export default function Previews({onChange}) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      onChange(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
      console.log({acceptedFiles})
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div  style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className=" mt-2 h-[90%] w-full border text-center rounded-lg flex justify-center items-center border-dashed border-gray-light ">
      <div {...getRootProps({className: 'dropzone p-12'})}>
        <input {...getInputProps()} />
        {/* <input type='file' onChange={(e)=>} /> */}
        <p className='text-14 text-gray'>Drag  drop some files here, or click to select files</p>
      </div>
      
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}
