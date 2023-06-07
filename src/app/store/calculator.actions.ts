import { Action, createAction } from "@ngrx/store";

export enum ActionTypes {
    ADD_NUMBER = '[Add number] Load number entered by user',
    ADD_OPERATOR = '[Add opeartor] Load operator entered by user',
    CLEAR = '[Clear Input] Clear the input screen',
    DELETE = '[Delete] Delete last input in the calcuation',
    CALCULATE = '[Calculate] Compute the calcuation',
    ADD_TO_MEMORY = '[Add Expression] Add expression to memory',
    CLEAR_MEMORY = '[Clear Expression] Clear expression from memory',
    LOAD = '[Load Expression] Load expression from memory',
}

    export class AddNumberToCalucator implements Action {
        readonly type = ActionTypes.ADD_NUMBER;      
        constructor(public payload: string) {}
      }           
      export class AddOperatorToCalucator implements Action {
        readonly type = ActionTypes.ADD_OPERATOR;      
        constructor(public payload: string) {}
      }      
      export class CalculateInput implements Action {
        readonly type = ActionTypes.CALCULATE;      
        constructor(public payload: string) {}
      }
      export class DeleteInput implements Action {
        readonly type = ActionTypes.DELETE;      
        constructor() {}
      }
      export class AddToMemory implements Action {
        readonly type = ActionTypes.ADD_TO_MEMORY;      
        constructor() {}
      }
      export class LoadFromMemory implements Action {
        readonly type = ActionTypes.LOAD;      
        constructor() {}
      }
      export class ClearMemory implements Action {
        readonly type = ActionTypes.CLEAR_MEMORY;      
        constructor() {}
      }
      export class ClearScreen implements Action {
        readonly type = ActionTypes.CLEAR;      
        constructor() {}
      }
    
      export type CalculatorActions = 
      | ClearScreen
      | CalculateInput
      | AddOperatorToCalucator
      | DeleteInput
      | AddNumberToCalucator
      | AddToMemory
      | ClearMemory
      | LoadFromMemory;


  