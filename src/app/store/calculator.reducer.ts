import { createReducer, on, Action } from '@ngrx/store';
import { ActionTypes, CalculatorActions } from './calculator.actions';
import { CalculatorState, INITIAL_STATE } from './calculator.state';
import { evaluate } from 'mathjs';


export function calculatorReducer(state: CalculatorState = INITIAL_STATE, action: CalculatorActions) {
  switch (action.type) {
    case ActionTypes.CLEAR:
      return { 
        ...clear(state)
      };
    case ActionTypes.CALCULATE:
      return { 
        ...calculate(state, action.payload) 
      };      
    case ActionTypes.ADD_NUMBER:
      return { 
        ...addNumber(state, action.payload) 
      };      
    case ActionTypes.DELETE:
      return { 
        ...deleteLast(state) 
      };
    case ActionTypes.ADD_OPERATOR:
      return  { 
        ...addOperator(state, action.payload) 
      };
    case ActionTypes.ADD_TO_MEMORY:
      return  { 
        ...addToMemory(state) 
      };     
      case ActionTypes.CLEAR_MEMORY:
        return  { 
          ...clearMemory(state) 
        };
    default:
        return state;
  }
}

export const deleteLast = (state: CalculatorState) => {
  return { 
    ...state, 
    expression: state.expression.slice(0,-1)
  };
}
export const addToMemory = (state: CalculatorState) => {
  return { 
    ...state, 
    memory: state.expression,
    currentSum: 0,
    expression: ""
    
  };
}
export const clearMemory = (state: CalculatorState) => {
  return { 
    ...state, 
    memory: null,
    currentSum: 0,
    expression: ""
  };
}

export const addNumber = (state: CalculatorState,  number : string ) => {
  if (state.expression === '0') {
    return { 
      ...state, 
      expression: number };
  } else {
    return { 
      ...state, 
      expression: state.expression + number };
  }
};
export const addOperator = (state: CalculatorState,  operator: string) => {
 const isLastCharOperator = isNaN(Number(state.expression.split("").splice(-1).toString()));
 if (state.expression === "") {
  return {
    ...state,
    expression: ""
  }
 }

  return { 
    ...state, 
    expression: isLastCharOperator? state.expression.slice(0,-1) + `${''+ operator+ ''}` : state.expression +  `${''+ operator+ ''}` 
  };
};

const compute = (expression = '0'): number =>  evaluate(expression);

const sanitize = (expression): string => {
  const lastChar = expression.split("").splice(-1).toString();
  if (isNaN(Number(lastChar))) {
    expression = expression.substring(0, expression.length -1);
  }
  return expression;
}

export const calculate = (state: CalculatorState, payload: string) => {  
  let result: number;
  const validExpression = !!payload;
  if (!validExpression) {
    return { 
      ...clear(state)
    };
  } else {
    const expression = sanitize(payload)
    result = compute(expression);
    return { 
      ...state, 
      currentSum: result, 
      expression : expression,
    };
  }
}

export const clear = (state: CalculatorState) => {  
    return { 
      ...state, 
      currentSum: 0, 
      expression : "",
      operator: null
    };  
}


