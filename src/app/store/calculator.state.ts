export interface CalculatorState {
    currentSum: number;
    expression: string;
    memory: string;
    operator: string;
};

export const INITIAL_STATE: CalculatorState = {
    currentSum: 0,
    expression: '',
    memory: null,
    operator: null
};