'use client'

import { weviate, toBase64 } from '@/utils';
import { PhotoIcon } from '@heroicons/react/20/solid'
import { useState, useRef } from 'react'
import ProductList from './productlist';

export default function DragDropFile() {

    const [dragActive, setDragActive] = useState(false);
    const [results, setResults] = useState(false);
    const [dropped, setDropped] = useState(false);
    const inputRef = useRef(null);
    const imageRef = useRef(null);
    
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    const handleDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        
        // Display dropped image on page
        setDropped(true);
        const img = e.dataTransfer.files[0];
        const b64 = await toBase64(img);
        const b64TypeStripped = b64.split(',')[1];
        const blobURL = URL.createObjectURL(img);
        imageRef.current.src = blobURL;

        // Send image to weviate server for processing
        const data = await weviate(b64TypeStripped);
        console.log(data);
        setResults(data);
      }
    };
    
    const handleChange = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.target.files && e.target.files[0]) {
        const img = e.target.files[0];
      }
    };
    
    const onButtonClick = () => {
      inputRef.current.click();
    };
    
    return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <form className='aspect-1' id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => {e.preventDefault(); e.stopPropagation();}}>
        <input className='hidden' ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label className={`bg-gray-200 ${dragActive ? "bg-white" : ""} h-full flex justify-center items-center  p-16 rounded-lg`} id="label-file-upload" htmlFor="input-file-upload">
          <div className='flex flex-col items-center'>
            <PhotoIcon className='h-16 w-16 text-gray-400'></PhotoIcon>
            <p>Drag and drop your image here or</p>
            <button id="upload-button" className='no-underline hover:underline' onClick={onButtonClick}>Upload an image</button>
          </div>
        </label>
        { dragActive && <div className="h-full w-full absolute top-0 bottom-0 left-0 right-0" id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
      { dropped && <img ref={imageRef} className='h-[500px] aspect-1'></img>}
      { results && <ProductList results={results}></ProductList>}
    </div>
    );
  };