// src/utils/conversion.js

// Function to check if a character is an operator
const isOperator = (char) => {
  return ['+', '-', '*', '/', '^', '%'].includes(char);
};

// Function to check precedence for Infix conversions
const precedence = (char) => {
  switch (char) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
    case '%':
      return 2;
    case '^':
      return 3;
    default:
      return 0; // For operands/parentheses
  }
};

// Helper function to create the final step
const createFinalStep = (finalResult, stack, output, stepCounter, to) => {
    return {
        step: stepCounter,
        inputSymbol: 'END',
        operation: 'DONE',
        currentStack: [...stack],
        currentOutput: output ? [...output] : undefined,
        narration: `**Conversion complete!** The final ${to} expression is: **${finalResult}**`,
    };
};

/**
 * 1. Postfix to Prefix (Scan L-R, combine: Operator + Op1 + Op2)
 */
export const convertPostfixToPrefix = (postfix) => {
  const stack = [];
  const steps = [];
  let stepCounter = 1;
  const expression = postfix.trim().toUpperCase().split(/\s+/).join(''); 
  if (expression.length === 0) return { finalPrefix: '', steps: [] };

  for (const symbol of expression) {
    if (!isOperator(symbol)) {
      // Operand -> PUSH
      stack.push(symbol);
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: 'PUSH',
        currentStack: [...stack],
        narration: `Scanning '${symbol}' (L-R). It's an **operand**. Pushing onto the stack.`,
      });
    } else {
      // Operator -> POP, POP, COMBINE, PUSH
      if (stack.length < 2) return { finalPrefix: 'ERROR: Invalid Postfix', steps: [] };
      
      const operand2 = stack.pop(); // Pop 2
      steps.push({ step: stepCounter++, inputSymbol: symbol, operation: 'POP_OP2', operand2: operand2, currentStack: [...stack], narration: `Operator '${symbol}'. Popping Operand 2: **${operand2}**.` });

      const operand1 = stack.pop(); // Pop 1
      steps.push({ step: stepCounter++, inputSymbol: symbol, operation: 'POP_OP1', operand1: operand1, operand2: operand2, currentStack: [...stack], narration: `Popping Operand 1: **${operand1}**.` });
      
      const newExpression = symbol + operand1 + operand2; // Prefix: Operator + Op1 + Op2
      stack.push(newExpression);
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: 'COMBINE_PUSH',
        currentStack: [...stack],
        narration: `Combining: **${symbol}${operand1}${operand2}**. Pushing the result.`,
      });
    }
  }

  const finalPrefix = stack.length === 1 ? stack[0] : 'ERROR: Invalid Postfix';
  steps.push(createFinalStep(finalPrefix, stack, undefined, stepCounter++, 'Prefix'));
  return { finalPrefix, steps };
};


/**
 * 2. Prefix to Postfix (Scan R-L, combine: Op1 + Op2 + Operator)
 */
export const convertPrefixToPostfix = (prefix) => {
  const stack = [];
  const steps = [];
  let stepCounter = 1;
  const expression = prefix.trim().toUpperCase().split(/\s+/).join(''); 
  if (expression.length === 0) return { finalPostfix: '', steps: [] };

  // Scan from RIGHT to LEFT
  for (let i = expression.length - 1; i >= 0; i--) {
    const symbol = expression[i];

    if (!isOperator(symbol)) {
      // Operand -> PUSH
      stack.push(symbol);
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: 'PUSH',
        currentStack: [...stack],
        narration: `Scanning '${symbol}' (R-L). It's an **operand**. Pushing onto the stack.`,
      });
    } else {
      // Operator -> POP, POP, COMBINE, PUSH
      if (stack.length < 2) return { finalPostfix: 'ERROR: Invalid Prefix', steps: [] };
      
      const operand1 = stack.pop(); // Pop 1 (will be Op1 in R-L)
      steps.push({ step: stepCounter++, inputSymbol: symbol, operation: 'POP_OP1', operand1: operand1, currentStack: [...stack], narration: `Operator '${symbol}'. Popping Operand 1: **${operand1}**.` });

      const operand2 = stack.pop(); // Pop 2 (will be Op2 in R-L)
      steps.push({ step: stepCounter++, inputSymbol: symbol, operation: 'POP_OP2', operand1: operand1, operand2: operand2, currentStack: [...stack], narration: `Popping Operand 2: **${operand2}**.` });
      
      const newExpression = operand1 + operand2 + symbol; // Postfix: Op1 + Op2 + Operator
      stack.push(newExpression);
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: 'COMBINE_PUSH',
        currentStack: [...stack],
        narration: `Combining: **${operand1}${operand2}${symbol}**. Pushing the result.`,
      });
    }
  }

  const finalPostfix = stack.length === 1 ? stack[0] : 'ERROR: Invalid Prefix';
  steps.push(createFinalStep(finalPostfix, stack, undefined, stepCounter++, 'Postfix'));
  return { finalPostfix, steps };
};

/**
 * 3. Infix to Postfix (Scan L-R, Stack for Operators, use Precedence)
 */
export const convertInfixToPostfix = (infix) => {
  const stack = [];
  const output = [];
  const steps = [];
  let stepCounter = 1;
  // Allows optional spaces in the input, which are removed here for processing
  const expression = infix.trim().toUpperCase().split(/\s+/).join(''); 
  if (expression.length === 0) return { finalPostfix: '', steps: [] };

  for (const symbol of expression) {
    if (!isOperator(symbol) && symbol !== '(' && symbol !== ')') {
      // 1. Operand -> Add to output
      output.push(symbol);
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: 'ADD_TO_OUTPUT',
        currentStack: [...stack],
        currentOutput: [...output],
        narration: `Scanning '${symbol}'. It's an **operand**. Adding to the output.`,
      });
    } else if (symbol === '(') {
      // 2. '(' -> PUSH to stack
      stack.push(symbol);
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: 'PUSH',
        currentStack: [...stack],
        currentOutput: [...output],
        narration: `Scanning '('. Pushing onto the operator stack.`,
      });
    } else if (symbol === ')') {
      // 3. ')' -> Pop until '('
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      if (stack.length === 0) return { finalPostfix: 'ERROR: Unmatched Parenthesis', steps: [] };
      
      stack.pop(); // Pop the '('
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: 'POP_PARENTHESIS',
        currentStack: [...stack],
        currentOutput: [...output],
        narration: `Scanning ')'. Popping operators to output until '(' is found and removed from stack.`,
      });
    } else if (isOperator(symbol)) {
      // 4. Operator -> Handle Precedence
      let poppedOps = [];
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        precedence(symbol) <= precedence(stack[stack.length - 1])
      ) {
        poppedOps.push(stack[stack.length - 1]);
        output.push(stack.pop());
      }
      
      stack.push(symbol); // Push the current operator
      steps.push({
        step: stepCounter++,
        inputSymbol: symbol,
        operation: poppedOps.length > 0 ? 'POP_PRECEDENCE_THEN_PUSH' : 'PUSH',
        currentStack: [...stack],
        currentOutput: [...output],
        narration: poppedOps.length > 0 
            ? `Scanning '${symbol}'. Popping higher/equal precedence operators (${poppedOps.join(', ')}) to output, then pushing '${symbol}'.`
            : `Scanning '${symbol}'. Pushing onto the stack.`,
      });
    }
  }

  // 5. Final flush
  while (stack.length > 0) {
    if (stack[stack.length - 1] === '(' || stack[stack.length - 1] === ')') {
        return { finalPostfix: 'ERROR: Unmatched Parenthesis', steps: [] };
    }
    output.push(stack.pop());
  }
  
  const finalPostfix = output.join('');
  steps.push(createFinalStep(finalPostfix, stack, output, stepCounter++, 'Postfix'));
  return { finalPostfix, steps };
};