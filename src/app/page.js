'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // For URL routing/params
import { useSession, signIn, signOut } from 'next-auth/react'; // For Auth
import Link from 'next/link';

// NOTE: You must ensure these utility imports and component imports exist!
import {
  convertPostfixToPrefix,
  convertPrefixToPostfix,
  convertInfixToPostfix
} from '@/utils/conversion';
import StackDisplay from '@/components/StackDisplay';
import StepControls from '@/components/StepControls';


// --- START: DSA/Theme Definitions ---

// Define the conversion types with defaults
const CONVERSION_TYPES = {
  POSTFIX_TO_PREFIX: { key: 'finalPrefix', label: 'Postfix → Prefix', from: 'Postfix', to: 'Prefix', defaultInput: 'A B + C D - *', func: convertPostfixToPrefix, },
  PREFIX_TO_POSTFIX: { key: 'finalPostfix', label: 'Prefix → Postfix', from: 'Prefix', to: 'Postfix', defaultInput: '* + A B - C D', func: convertPrefixToPostfix, },
  INFIX_TO_POSTFIX: { key: 'finalPostfix', label: 'Infix → Postfix', from: 'Infix', to: 'Postfix', defaultInput: 'A + B * ( C - D ) / E', func: convertInfixToPostfix, },
};

const themes = {
  'code_editor': {
    label: 'Code Editor (Dark)', bg_main: 'bg-gray-900', bg_panel: 'bg-gray-800', bg_narration: 'bg-gray-900 border-teal-500', text_primary: 'text-white', text_heading: 'text-teal-400', text_input: 'text-yellow-300', text_highlight: 'text-green-500', border_primary: 'border-gray-700', border_accent: 'border-teal-500', stack_bg: 'bg-gray-800', stack_item_default: 'bg-teal-600 text-gray-900', stack_item_top: 'bg-red-500 text-white', button_primary: 'bg-teal-600 text-gray-900 hover:bg-teal-500', button_secondary: 'bg-yellow-600 text-gray-900 hover:bg-yellow-500', button_reset: 'bg-red-700 text-white hover:bg-red-600',
  },
  'matrix': {
    label: 'Matrix (Cyber Green)', bg_main: 'bg-black', bg_panel: 'bg-gray-900', bg_narration: 'bg-black border-green-500', text_primary: 'text-green-400', text_heading: 'text-green-300', text_input: 'text-green-500', text_highlight: 'text-lime-400', border_primary: 'border-gray-800', border_accent: 'border-green-500', stack_bg: 'bg-gray-900', stack_item_default: 'bg-green-700 text-black', stack_item_top: 'bg-red-600 text-white', button_primary: 'bg-green-600 text-black hover:bg-green-500', button_secondary: 'bg-yellow-500 text-black hover:bg-yellow-400', button_reset: 'bg-red-700 text-white hover:bg-red-600',
  },
  'chalkboard': {
    label: 'Chalkboard (Light)', bg_main: 'bg-white', bg_panel: 'bg-white', bg_narration: 'bg-gray-50 border-blue-500', text_primary: 'text-gray-900', text_heading: 'text-blue-700', text_input: 'text-gray-900', text_highlight: 'text-green-600', border_primary: 'border-gray-300', border_accent: 'border-blue-500', stack_bg: 'bg-gray-200', stack_item_default: 'bg-blue-600 text-white', stack_item_top: 'bg-red-600 text-white', button_primary: 'bg-blue-600 text-white hover:bg-blue-700', button_secondary: 'bg-yellow-500 text-white hover:bg-yellow-600', button_reset: 'bg-red-600 text-white hover:bg-red-700',
  },
};

const getDynamicBackgroundStyle = (key) => {
  if (key === 'code_editor') {
    return { backgroundColor: '#1f2937', backgroundImage: `linear-gradient(90deg, #2c3e50 1px, transparent 1px), linear-gradient(#2c3e50 1px, transparent 1px)`, backgroundSize: '20px 20px' };
  }
  if (key === 'matrix') {
    return { backgroundColor: '#000000', backgroundImage: `radial-gradient(#0f0 1px, transparent 1px), radial-gradient(#0f0 1px, transparent 1px)`, backgroundSize: '20px 20px' };
  }
  if (key === 'chalkboard') {
    return { backgroundColor: '#f0f0f0' };
  }
  return {};
};
// --- END: DSA/Theme Definitions ---

// --- START: Helper Components ---

const LandingPageContent = () => (
  <div className="text-center max-w-4xl p-10 bg-gray-800/80 rounded-2xl shadow-2xl border-t-4 border-teal-500 mx-auto">
    <h1 className="text-6xl font-extrabold text-teal-400 mb-6">
      DSA Conversion Animator 🚀
    </h1>
    <p className="text-2xl text-gray-300 mb-8">
      Master Data Structures & Algorithms by visualizing **Infix, Prefix, and Postfix** expression conversions with a dynamic stack.
    </p>
    <div className="text-left space-y-4 mb-10 text-lg text-gray-400">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Features:</h2>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong className="text-white">Animated Stack Operations:</strong> See push and pop operations in real-time.</li>
        <li><strong className="text-white">Multiple Conversions:</strong> Supports Postfix → Prefix, Prefix → Postfix, and Infix → Postfix.</li>
        <li><strong className="text-white">Custom Theming:</strong> Switch between Code Editor, Matrix, and Chalkboard styles.</li>
      </ul>
    </div>

    <Link href="/?mode=login" passHref legacyBehavior>
      <a className="bg-teal-600 text-gray-900 font-extrabold text-xl py-4 px-12 rounded-lg hover:bg-teal-500 transition duration-300 shadow-xl inline-block">
        Start Learning (Login Required)
      </a>
    </Link>
  </div>
);

const LoginPageContent = ({ router }) => {
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setError('');

    // Use the 'google' provider key for OAuth
    const result = await signIn('google', {
      redirect: false,
      callbackUrl: '/'
    });

    if (result.error) {
      // Note: Error handling for Google Auth is usually internal or redirection-based
      setError("Google sign-in failed. Please check your network or try again.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-2xl border-t-4 border-teal-500 mx-auto">
      <h2 className="text-3xl font-bold text-center text-teal-400">
        Sign In to DSA Animator
      </h2>
      {/* CORRECT USAGE of error state */}
      {error && <p className="text-red-400 text-center font-semibold">{error}</p>}

      {/* Google Sign-In Button */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-blue-600 text-white font-extrabold py-3 rounded-lg hover:bg-blue-500 transition duration-200 shadow-lg flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083c0-0.783-0.06-1.558-0.18-2.32c-0.21-1.39-0.9-2.61-1.92-3.69l-0.1-0.1c-1.38-1.52-3.23-2.6-5.26-3.22c-2.04-0.62-4.22-0.79-6.3-0.54c-1.48,0.18-2.92,0.61-4.2,1.26c-1.28,0.65-2.42,1.57-3.34,2.69c-0.92,1.11-1.61,2.44-1.98,3.88c-0.36,1.44-0.45,2.96-0.27,4.45c0.18,1.49,0.73,2.93,1.59,4.24c0.86,1.31,1.96,2.46,3.22,3.37c1.26,0.91,2.65,1.57,4.1,1.94c1.45,0.37,2.95,0.39,4.4,0.06c1.45-0.33,2.83-1.02,4.03-2.02c1.2-1,2.2-2.31,2.91-3.8c0.71-1.5,1.13-3.15,1.24-4.83c0.11-1.68,0.01-3.38-0.29-5.01H24v-4.04h17.27c-0.19,1.19-0.57,2.39-1.12,3.52c-0.55,1.13-1.3,2.18-2.18,3.15c-0.87,0.97-1.87,1.8-2.96,2.46c-1.09,0.66-2.27,1.15-3.51,1.44c-1.24,0.29-2.5,0.35-3.72,0.17c-1.22-0.18-2.4-0.59-3.48-1.19c-1.08-0.6-2.04-1.4-2.83-2.34c-0.79-0.95-1.42-2.04-1.85-3.22c-0.43-1.18-0.65-2.44-0.65-3.71c0-1.27,0.22-2.53,0.65-3.71c0.43-1.18,1.06-2.27,1.85-3.22c0.79-0.95,1.75-1.74,2.83-2.34c1.08-0.6,2.26-1.01,3.48-1.19c1.22-0.18,2.48-0.12,3.72,0.17c1.24,0.29,2.42,0.78,3.51,1.44c1.09,0.66,2.09,1.49,2.96,2.46c0.88,0.97,1.63,2.02,2.18,3.15c0.55,1.13,0.93,2.33,1.12,3.52H43.611z"
    pathfill="#33A853" />
          <path fill="#4285F4" d="M11.23,28.61c0.11,1.68,0.01,3.38-0.29,5.01c-0.3,1.63-0.9,3.15-1.78,4.52c-0.88,1.37-1.99,2.56-3.3,3.46c-1.31,0.89-2.77,1.49-4.31,1.78c-1.54,0.29-3.08,0.19-4.57-0.3c-1.49-0.49-2.87-1.31-4.04-2.42c-1.17-1.1-2.12-2.4-2.8-3.83c-0.68-1.43-1.09-3-1.21-4.63c-0.12-1.63-0.02-3.29,0.28-4.9c0.3-1.61,0.9-3.13,1.78-4.49c0.88-1.36,1.99-2.54,3.3-3.44c1.31-0.9,2.77-1.49,4.31-1.78c1.54-0.29,3.08-0.19,4.57,0.3c1.49,0.49,2.87,1.31,4.04,2.42c1.17,1.1,2.12,2.4,2.8,3.83c0.68,1.43,1.09,3,1.21,4.63C11.3,27.05,11.4,28.71,11.23,28.61z" transform="translate(19 14.28)" /></svg>
        <span>Sign in with Google</span>
      </button>

      <p className="text-center text-gray-400">
        <Link href="/" className="text-teal-400 hover:underline">Go back to Landing Page</Link>
      </p>
    </div>
  );
};

// --- END: Helper Components ---


// --- START: Main ConversionAnimator Component ---

export function ConversionAnimatorApp({ currentTheme }) {
  const { data: session } = useSession(); // Get session data
  const [conversionType, setConversionType] = useState('POSTFIX_TO_PREFIX');
  const [inputExpression, setInputExpression] = useState(CONVERSION_TYPES.POSTFIX_TO_PREFIX.defaultInput);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState(CONVERSION_TYPES.POSTFIX_TO_PREFIX.defaultInput);

  const currentConversion = CONVERSION_TYPES[conversionType];

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
    setCurrentStep(0);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    const newDefaultInput = CONVERSION_TYPES[newType].defaultInput;
    setConversionType(newType);
    setUserInput(newDefaultInput);
    setInputExpression(newDefaultInput);
    setCurrentStep(0);
  };

  const renderNarration = (narration) => ({ __html: narration });

  return (
    <div className={`p-4 sm:p-8 ${currentTheme.text_primary}`}>
      {/* Header and Logout */}
      <header className="text-center mb-6 relative">
        <h1 className={`text-4xl font-extrabold ${currentTheme.text_heading} drop-shadow-lg`}>
          Expression Conversion Animator 🧠
        </h1>
        <p className={`font-medium mt-1 ${currentTheme.text_primary}`}>
          User: {session.user.name} | **{currentConversion.from}** to **{currentConversion.to}**
        </p>
        <button
          onClick={() => signOut({ callbackUrl: '/?mode=login' })}
          className="bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-500 absolute top-0 right-0 font-semibold"
        >
          Logout
        </button>
      </header>

      <div className={`max-w-4xl mx-auto mb-8 p-6 ${currentTheme.bg_panel} rounded-xl shadow-2xl border-t-4 ${currentTheme.border_accent}`}>
        <div className="flex justify-between gap-4">
          {/* Conversion Selector */}
          <select
            value={conversionType}
            onChange={handleTypeChange}
            className={`p-2 border ${currentTheme.border_primary} rounded-lg text-base font-semibold ${currentTheme.bg_main} ${currentTheme.text_heading} focus:ring-blue-500 focus:border-blue-500 flex-1`}
          >
            {Object.entries(CONVERSION_TYPES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <form onSubmit={handleRunConversion} className="flex gap-4 mt-4">
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
            <p className="text-lg font-medium">Input ({currentConversion.from}):
              <span className={`font-mono text-xl font-bold ml-2 ${currentTheme.text_input}`}>{inputExpression}</span>
            </p>
            <p className="text-lg font-medium">Current Symbol:
              <span className={`font-mono text-xl font-bold ml-2 ${currentAnimationStep?.inputSymbol === 'END' ? 'text-gray-500' : currentTheme.text_highlight}`}>
                {currentAnimationStep?.inputSymbol || 'START'}
              </span>
            </p>
            {currentOutput !== null && (
              <p className="text-lg font-medium mt-2">Current Output ({currentConversion.to}):
                <span className={`font-mono text-xl font-bold ml-2 ${currentTheme.text_highlight}`}>{currentOutput || '...'}</span>
              </p>
            )}
          </div>

          {/* Narration Box */}
          <div className={`h-40 p-4 rounded-lg shadow-2xl border ${currentTheme.bg_narration} mb-6 flex flex-col justify-center`}>
            <p className={`text-base italic leading-relaxed font-mono ${currentTheme.text_primary}`}
              dangerouslySetInnerHTML={renderNarration(currentAnimationStep?.narration || 'Click Animate to begin.')} />
          </div>

          {/* Step Controls */}
          <StepControls
            currentStep={currentStep} totalSteps={steps.length - 1}
            onPrev={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            onNext={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            onReset={() => setCurrentStep(0)}
            theme={currentTheme}
          />

          {/* Final Result Box */}
          <div className={`mt-6 p-4 rounded-lg border ${currentTheme.border_accent} shadow-md`} style={{ backgroundColor: currentTheme.text_highlight.replace('text-', '#').replace('-500', '400').replace('-600', '500') }}>
            <h3 className="text-xl font-bold text-gray-900">Final Result ({currentConversion.to}):
              <span className="font-mono text-2xl ml-2 text-white">{currentStep === steps.length - 1 ? finalResult : 'In Progress...'}</span>
            </h3>
          </div>
        </div>

        {/* Right Column: Stack Visualization */}
        <div className="md:col-span-1">
          <h2 className={`text-2xl font-bold ${currentTheme.text_heading} mb-4`}>Stack Visualization</h2>
          <StackDisplay stack={currentStack} theme={currentTheme} />
        </div>
      </div>
    </div>
  );
}

// --- END: Main ConversionAnimator Component ---

// --- START: Root Page Component (Handles Routing & Theme Selection) ---

export default function RootPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode'); // Check for 'mode=login'

  // Theme State Management 
  const [themeKey, setThemeKey] = useState('code_editor');
  const currentTheme = themes[themeKey];

  const { data: session, status } = useSession();

  // Decide which component to render based on Auth status and URL parameter
  let ContentComponent;
  if (status === 'loading') {
    return <div className="min-h-screen bg-gray-900 text-teal-400 flex items-center justify-center">Loading...</div>;
  } else if (status === 'authenticated') {
    // Logged in: Render the Animator App
    ContentComponent = (
      <>
        {/* Theme Selector UI */}
        <div className="fixed top-4 right-20 z-10">
          <select
            value={themeKey}
            onChange={(e) => setThemeKey(e.target.value)}
            className={`p-2 border ${currentTheme.border_primary} rounded-lg text-base font-semibold ${currentTheme.bg_main} ${currentTheme.text_heading} focus:ring-blue-500 focus:border-blue-500`}
          >
            {Object.entries(themes).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <ConversionAnimatorApp currentTheme={currentTheme} />
      </>
    );
  } else if (mode === 'login') {
    // Not logged in, but requesting login page
    ContentComponent = <LoginPageContent router={router} />;
  } else {
    // Not logged in, default view is the Landing Page
    ContentComponent = <LandingPageContent />;
  }

  // Final Layout Wrapper
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={getDynamicBackgroundStyle(themeKey)}
    >
      <div className="w-full">
        {ContentComponent}
      </div>
    </div>
  );
}