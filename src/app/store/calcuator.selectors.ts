import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalculatorState } from "./calculator.state";


export const selectCalculator = createFeatureSelector<CalculatorState>('calculator');

export const currentComputedValue = createSelector(
    selectCalculator,
    (state: CalculatorState) => state?.currentSum
);
export const currentExpression = createSelector(
    selectCalculator,
    (state: CalculatorState) => state?.expression
);
export const memoryExpression = createSelector(
    selectCalculator,
    (state: CalculatorState) => state?.memory
);