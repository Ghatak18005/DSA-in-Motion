// src/config/themes.js

export const themes = {
    // -----------------------------------------------------------------
    // 1. Code Editor Theme (Original Dark/Indigo)
    // -----------------------------------------------------------------
    'code_editor': {
        label: 'Code Editor (Dark)',
        bg_primary: 'bg-gray-50', // Fallback for body
        bg_main: 'bg-gray-900',
        bg_panel: 'bg-gray-800',
        bg_narration: 'bg-gray-900 border-teal-500',
        
        text_primary: 'text-white',
        text_heading: 'text-teal-400',
        text_input: 'text-yellow-300',
        text_highlight: 'text-green-500',
        
        border_primary: 'border-gray-700',
        border_accent: 'border-teal-500',

        // Stack/Controls
        stack_bg: 'bg-gray-800',
        stack_item_default: 'bg-teal-600 text-gray-900',
        stack_item_top: 'bg-red-500 text-white',
        
        button_primary: 'bg-teal-600 text-gray-900 hover:bg-teal-500',
        button_secondary: 'bg-yellow-600 text-gray-900 hover:bg-yellow-500',
        button_reset: 'bg-red-700 text-white hover:bg-red-600',
    },

    // -----------------------------------------------------------------
    // 2. Matrix Theme (High Contrast Green/Black)
    // -----------------------------------------------------------------
    'matrix': {
        label: 'Matrix (Cyber Green)',
        bg_primary: 'bg-gray-900',
        bg_main: 'bg-black',
        bg_panel: 'bg-gray-900',
        bg_narration: 'bg-black border-green-500',
        
        text_primary: 'text-green-400',
        text_heading: 'text-green-300',
        text_input: 'text-green-500',
        text_highlight: 'text-lime-400',
        
        border_primary: 'border-gray-800',
        border_accent: 'border-green-500',

        // Stack/Controls
        stack_bg: 'bg-gray-900',
        stack_item_default: 'bg-green-700 text-black',
        stack_item_top: 'bg-red-600 text-white',

        button_primary: 'bg-green-600 text-black hover:bg-green-500',
        button_secondary: 'bg-yellow-500 text-black hover:bg-yellow-400',
        button_reset: 'bg-red-700 text-white hover:bg-red-600',
    },
    
    // -----------------------------------------------------------------
    // 3. Chalkboard Theme (Light/White Theme)
    // -----------------------------------------------------------------
    'chalkboard': {
        label: 'Chalkboard (Light)',
        bg_primary: 'bg-gray-100',
        bg_main: 'bg-white',
        bg_panel: 'bg-white',
        bg_narration: 'bg-gray-50 border-blue-500',
        
        text_primary: 'text-gray-900',
        text_heading: 'text-blue-700',
        text_input: 'text-gray-900',
        text_highlight: 'text-green-600',
        
        border_primary: 'border-gray-300',
        border_accent: 'border-blue-500',

        // Stack/Controls
        stack_bg: 'bg-gray-200',
        stack_item_default: 'bg-blue-600 text-white',
        stack_item_top: 'bg-red-600 text-white',

        button_primary: 'bg-blue-600 text-white hover:bg-blue-700',
        button_secondary: 'bg-yellow-500 text-white hover:bg-yellow-600',
        button_reset: 'bg-red-600 text-white hover:bg-red-700',
    },
};