// src/components/StackDisplay.jsx

import React from 'react';

export default function StackDisplay({ stack, theme }) {
  const visualStack = [...stack].reverse(); // Reverse for visual LIFO

  return (
    <div className={`p-4 rounded-lg shadow-inner h-full min-h-[300px] flex flex-col justify-end items-center ${theme.stack_bg}`}>
      <div 
        className={`w-full max-w-xs border-x-4 border-b-4 rounded-b-lg p-1 flex flex-col-reverse items-center ${theme.border_accent}`}
        // Customizing the border to match the theme accent
      >
        
        {visualStack.length === 0 && (
          <div className="text-gray-500 text-lg italic p-4">Stack is Empty</div>
        )}

        {visualStack.map((item, index) => (
          <div 
            key={`${item}-${index}`}
            className={`w-full p-2 mb-1 text-center font-mono text-xl font-bold rounded-md transition-all duration-300 ease-out 
                        ${index === 0 
                            ? theme.stack_item_top + ' shadow-lg animate-pulse' // Highlight Top element
                            : theme.stack_item_default}` // Stacked elements
                        } 
          >
            {item}
          </div>
        ))}
        
      </div>
      <p className={`mt-2 text-sm font-bold ${theme.text_heading}`}>TOP</p>
    </div>
  );
}