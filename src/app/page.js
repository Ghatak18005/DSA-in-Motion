// src/app/page.js

'use client';

import React, { useState, useMemo } from 'react';
import { 
    convertPostfixToPrefix, 
    convertPrefixToPostfix,
    convertInfixToPostfix
} from '@/utils/conversion'; 
import { themes } from '@/config/themes'; // NEW IMPORT
import StackDisplay from '@/components/StackDisplay';
import StepControls from '@/components/StepControls';

// Define the conversion types with defaults
const CONVERSION_TYPES = {
  POSTFIX_TO_PREFIX: { key: 'finalPrefix', label: 'Postfix → Prefix', from: 'Postfix', to: 'Prefix', defaultInput: 'A B + C D - *', func: convertPostfixToPrefix, },
  PREFIX_TO_POSTFIX: { key: 'finalPostfix', label: 'Prefix → Postfix', from: 'Prefix', to: 'Postfix', defaultInput: '* + A B - C D', func: convertPrefixToPostfix, },
  INFIX_TO_POSTFIX: { key: 'finalPostfix', label: 'Infix → Postfix', from: 'Infix', to: 'Postfix', defaultInput: 'A + B * ( C - D ) / E', func: convertInfixToPostfix, },
};


export default function ConversionAnimator() {
  const [themeKey, setThemeKey] = useState('code_editor'); // State for current theme
  const [conversionType, setConversionType] = useState('POSTFIX_TO_PREFIX');
  const [inputExpression, setInputExpression] = useState(CONVERSION_TYPES.POSTFIX_TO_PREFIX.defaultInput);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState(CONVERSION_TYPES.POSTFIX_TO_PREFIX.defaultInput);

  const currentConversion = CONVERSION_TYPES[conversionType];
  const currentTheme = themes[themeKey]; // Get the current theme object

  // Memoize the conversion result
  const { finalResult, steps } = useMemo(() => {
    const { func, key } = currentConversion;
    const result = func(inputExpression);
    return {
        finalResult: result[key] || 'ERROR',
        steps: result.steps,
    };
  }, [inputExpression, currentConversion]);

  const currentAnimationStep = steps[currentStep];
  const currentOutput = currentAnimationStep?.currentOutput ? currentAnimationStep.currentOutput.join(' ') : null;
  const currentStack = currentAnimationStep?.currentStack || [];

  const handleRunConversion = (e) => {
    e.preventDefault();
    setInputExpression(userInput);
    setCurrentStep(0); // Reset to start
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const newDefaultInput = CONVERSION_TYPES[newType].defaultInput;
    setConversionType(newType);
    setUserInput(newDefaultInput);
    setInputExpression(newDefaultInput);
    setCurrentStep(0);
  };
  
  const handleThemeChange = (e) => {
    setThemeKey(e.target.value);
  };

  const renderNarration = (narration) => ({ __html: narration });

  // Dynamically apply a custom background style based on the theme key
  // You can define more complex background patterns here if needed
  const getDynamicBackgroundStyle = (key) => {
      if (key === 'code_editor') {
          return { backgroundColor: '#1f2937', backgroundImage: `linear-gradient(90deg, #2c3e50 1px, transparent 1px), linear-gradient(#2c3e50 1px, transparent 1px)`, backgroundSize: '20px 20px' };
      }
      if (key === 'matrix') {
          return { backgroundColor: '#000000', backgroundImage: `radial-gradient(#0f0 1px, transparent 1px), radial-gradient(#0f0 1px, transparent 1px)`, backgroundSize: '20px 20px' };
      }
      if (key === 'chalkboard') {
          return { backgroundColor: '#f0f0f0' }; // Simple light background
      }
      return {};
  };

  return (
    <div style={getDynamicBackgroundStyle(themeKey)} className={`min-h-screen p-4 sm:p-8 ${currentTheme.text_primary}`}>
      <header className="text-center mb-8">
        <h1 className={`text-4xl font-extrabold ${currentTheme.text_heading} drop-shadow-lg`}>
          Expression Conversion Animator 🧠
        </h1>
        <p className={`font-medium mt-2 ${currentTheme.text_primary}`}>
          Visualize **{currentConversion.from}** to **{currentConversion.to}** conversion using a **Stack**.
        </p>
      </header>
      
      {/* Input, Theme & Type Selection Form */}
      <div className={`max-w-4xl mx-auto mb-8 p-6 ${currentTheme.bg_panel} rounded-xl shadow-2xl border-t-4 ${currentTheme.border_accent}`}>
        <div className="flex justify-between gap-4 mb-4">
            {/* Theme Selector */}
            <select
                value={themeKey}
                onChange={handleThemeChange}
                className={`p-2 border ${currentTheme.border_primary} rounded-lg text-base font-semibold ${currentTheme.bg_main} ${currentTheme.text_heading} focus:ring-blue-500 focus:border-blue-500`}
            >
                {Object.entries(themes).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
            
            {/* Conversion Selector */}
            <select
                value={conversionType}
                onChange={handleTypeChange}
                className={`p-2 border ${currentTheme.border_primary} rounded-lg text-base font-semibold ${currentTheme.bg_main} ${currentTheme.text_heading} focus:ring-blue-500 focus:border-blue-500`}
            >
                {Object.entries(CONVERSION_TYPES).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
            </select>
        </div>

        <form onSubmit={handleRunConversion} className="flex gap-4">
          {/* Input Field and Animate Button */}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={`Enter ${currentConversion.from} Expression (e.g., ${currentConversion.defaultInput})`}
            className={`flex-grow p-3 border ${currentTheme.border_primary} rounded-lg focus:ring-blue-500 focus:border-blue-500 text-lg font-mono ${currentTheme.bg_main} ${currentTheme.text_input} placeholder-gray-400`}
            required
          />
          <button
            type="submit"
            className={`font-extrabold py-3 px-6 rounded-lg transition duration-200 shadow-xl ${currentTheme.button_primary}`}
          >
            Animate
          </button>
        </form>
      </div>

      <div className={`max-w-6xl mx-auto ${currentTheme.bg_main} rounded-xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 border ${currentTheme.border_primary}`}>
        
        {/* Left Column: Controls & Narration */}
        <div className="md:col-span-2">
          <h2 className={`text-2xl font-bold ${currentTheme.text_heading} mb-4`}>Conversion Steps</h2>
          
          {/* Info Panel */}
          <div className={`mb-6 p-4 ${currentTheme.bg_panel} rounded-lg border ${currentTheme.border_primary} shadow-inner`}>
             <p className="text-lg font-medium">
                Input Expression ({currentConversion.from}): 
                <span className={`font-mono text-xl font-bold ml-2 ${currentTheme.text_input}`}>{inputExpression}</span>
             </p>
             <p className="text-lg font-medium">
                Current Symbol: 
                <span className={`font-mono text-xl font-bold ml-2 ${currentAnimationStep?.inputSymbol === 'END' ? 'text-gray-500' : currentTheme.text_highlight}`}>
                    {currentAnimationStep?.inputSymbol || 'START'}
                </span>
             </p>
             {/* Current Output */}
             {currentOutput !== null && (
                 <p className="text-lg font-medium mt-2">
                    Current Output ({currentConversion.to}): 
                    <span className={`font-mono text-xl font-bold ml-2 ${currentTheme.text_highlight}`}>{currentOutput || '...'}</span>
                 </p>
             )}
          </div>

          {/* Narration Box */}
          <div className={`h-40 p-4 rounded-lg shadow-2xl border ${currentTheme.bg_narration} mb-6 flex flex-col justify-center`}>
            <p className={`text-base italic leading-relaxed font-mono ${currentTheme.text_primary}`} 
               dangerouslySetInnerHTML={renderNarration(currentAnimationStep?.narration || 'Select a conversion type and theme, then click "Animate" to begin.')} />
          </div>
          
          {/* Step Controls */}
          <StepControls
            currentStep={currentStep}
            totalSteps={steps.length - 1}
            onPrev={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            onNext={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            onReset={() => setCurrentStep(0)}
            theme={currentTheme} // Pass theme
          />

          {/* Final Result Box */}
          <div className={`mt-6 p-4 rounded-lg border ${currentTheme.border_accent} shadow-md`} style={{backgroundColor: currentTheme.text_highlight.replace('text-', '#').replace('-500', '400').replace('-600', '500')}}> 
             <h3 className="text-xl font-bold text-gray-900">
                Final Result ({currentConversion.to}): 
                <span className="font-mono text-2xl ml-2 text-white">{currentStep === steps.length - 1 ? finalResult : 'In Progress...'}</span>
             </h3>
          </div>
        </div>

        {/* Right Column: Stack Visualization */}
        <div className="md:col-span-1">
          <h2 className={`text-2xl font-bold ${currentTheme.text_heading} mb-4`}>Stack Visualization</h2>
          <StackDisplay stack={currentStack} theme={currentTheme} /> {/* Pass theme */}
        </div>
      </div>
    </div>
  );
}