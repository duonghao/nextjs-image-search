'use client'

import { PhotoIcon } from '@heroicons/react/20/solid'
import { useState, useRef } from 'react'

export default function DragDropFile() {

    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);
    
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // handleFiles(e.dataTransfer.files);
      }
    };
    
    const handleChange = (e) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        // handleFiles(e.target.files);
      }
    };
    
    const onButtonClick = () => {
      inputRef.current.click();
    };
    
    return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <form className='aspect-1' id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
        <input className='hidden' ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label className='h-full flex justify-center items-center bg-gray-200 p-16 rounded-lg' id="label-file-upload" htmlFor="input-file-upload">
          <div className='flex flex-col items-center'>
            <PhotoIcon className='h-16 w-16 text-gray-400'></PhotoIcon>
            <p>Drag and drop your image here or</p>
            <button id="upload-button" className='no-underline hover:underline' onClick={onButtonClick}>Upload an image</button>
          </div>
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    </div>
    );
  };