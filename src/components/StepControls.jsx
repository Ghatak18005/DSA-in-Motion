// src/components/StepControls.jsx

import React from 'react';

export default function StepControls({ currentStep, totalSteps, onPrev, onNext, onReset, theme }) {
  const isStart = currentStep === 0;
  const isEnd = currentStep === totalSteps;

  const buttonStyle = "py-2 px-4 rounded-lg font-semibold transition duration-200 shadow-md";

  // Applying theme colors dynamically
  const resetClass = theme.button_reset;
  const prevClass = `${isStart ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : theme.button_secondary}`;
  const nextClass = `${isEnd ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : theme.button_primary}`;

  return (
    <div className={`flex justify-between items-center p-4 rounded-lg border ${theme.bg_panel} ${theme.border_primary}`}>
      <p className={`text-lg font-bold ${theme.text_heading}`}>
        Step {currentStep} / {totalSteps}
      </p>

      <div className="flex gap-3">
        <button onClick={onReset} className={`${buttonStyle} ${resetClass}`}>
          Reset
        </button>
        <button onClick={onPrev} disabled={isStart} className={`${buttonStyle} ${prevClass}`}>
          &larr; Prev Step
        </button>
        <button onClick={onNext} disabled={isEnd} className={`${buttonStyle} ${nextClass}`}>
          Next Step &rarr;
        </button>
      </div>
    </div>
  );
}