'use client'
import { LuPencil } from 'react-icons/lu';
import { ProfileTextInputProps } from '@/types';
import React, { useState, useRef } from 'react';

export default function ProfileTextInput({text, data}:ProfileTextInputProps) {

  const [value, setValue] = useState(data || '');
  const [editable, setEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value.toLocaleLowerCase();
    if (text == 'Username') {
      val = val.replace(/\s+/g, '-');
    }
    val = val.replace(/[^a-z-]/g, '');
    setValue(val);
  };

  function handleClick() {
    setEditable(true);
    inputRef.current?.focus();
  }

  function handleBlur() {
    setEditable(false);
  }

  const container = 'h-full px-3'
  return (
    <div className='flex gap-5 justify-between pe-7 items-center h-12'>
      <div className={`${container} bg-indigo-600 flex-1 flex items-center rounded-xl select-none`}>
        {text}:
      </div>
      <input 
        ref={inputRef}
        className={`${container} transition-all duration-500 flex-2 text-lg 
          rounded-xl outline-none focus:outline-none
          ${editable ? 'bg-blue-500' : 'bg-blue-600 cursor-not-allowed select-none pointer-events-none'} 
          ${value !== (data ?? '') ? 'ring-2 ring-amber-300' : ''}`}
        type={text == 'Email' ? 'email' : 'text'}
        value={value}
        onChange={handleChange}
        placeholder={text}
        readOnly={!editable}
        onBlur={handleBlur}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.blur()}
      />
      <div
        className={`${container} bg-blue-600 transition-transform flex items-center 
          justify-center rounded-xl text-2xl cursor-pointer hover:scale-105
          `}
        onClick={handleClick}
      >
        <div className={`transition-colors duration-300 ${editable ? 'text-amber-300' : ''}`}>
          <LuPencil />
        </div>
      </div>
    </div>
  )
}