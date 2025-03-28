
import React, { useRef, useState } from 'react';
import Input from '../Input';

const variables = ['USER_NAME', 'USER_ID', 'USER_EMAIL', 'USER_ADDRESS','PROJECT_NAME','TOKEN_AMOUNT','TOKEN_VALUE','CONTRACT_DATE','JURISDICTION_CITY'];

const BracketSuggestionInput = ({ value, onChange, placeholder, error }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    const cursor = e.target.selectionStart;
    const lastChar = val.slice(cursor - 1, cursor);

    onChange(val);
    setCursorPos(cursor);

    if (lastChar === '{') {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInsertVariable = (variable) => {
    const newText = value.slice(0, cursorPos) + variable + value.slice(cursorPos);
    onChange(newText);
    setShowSuggestions(false);

    setTimeout(() => {
      if (inputRef.current) {
        const newCursor = cursorPos + variable.length;
        inputRef.current.focus();
        inputRef.current.selectionStart = newCursor;
        inputRef.current.selectionEnd = newCursor;
      }
    }, 0);
  };

  return (
    <div className='relative w-full mt-4'>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        // className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}

      {showSuggestions && (
        <ul className="absolute z-10 bg-black-600 border shadow-md rounded-md mt-2 w-64">
          {variables.map((variable) => (
            <li
              key={variable}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm"
              onClick={() => handleInsertVariable(variable + '}')}
            >
              {`{${variable}}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BracketSuggestionInput;
