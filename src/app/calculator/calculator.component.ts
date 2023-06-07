import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalculatorState } from '../store/calculator.state';
import { AddNumberToCalucator, AddOperatorToCalucator, AddToMemory, CalculateInput, ClearMemory, ClearScreen, DeleteInput } from '../store/calculator.actions';
import { currentComputedValue, currentExpression, memoryExpression } from '../store/calcuator.selectors';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  expression: string = "";
  computedValue: number;
  @ViewChild('one') one: ElementRef;
  @ViewChild('two') two: ElementRef;
  @ViewChild('three') three: ElementRef;
  @ViewChild('four') four: ElementRef;
  @ViewChild('five') five: ElementRef;
  @ViewChild('six') six: ElementRef;
  @ViewChild('seven') seven: ElementRef;
  @ViewChild('eight') eight: ElementRef;
  @ViewChild('nine') nine: ElementRef;
  @ViewChild('zero') zero: ElementRef;

  @ViewChild('add') add: ElementRef;
  @ViewChild('subtract') subtract: ElementRef;
  @ViewChild('multiply') multiply: ElementRef;
  @ViewChild('divide') divide: ElementRef;  

  @ViewChild('comma') comma: ElementRef;
  @ViewChild('escape') escape: ElementRef;
  @ViewChild('calculate') calculate: ElementRef;
  @ViewChild('delete') delete: ElementRef;

  highlightedButton: ElementRef | null = null;


  constructor(private store: Store<CalculatorState>) {
    this.store.select(currentExpression).subscribe(expression => { 
      this.expression = expression;
    });
    this.store.select(currentComputedValue).subscribe(sum => { 
      this.computedValue = sum; 
    });
  }

  get viewExpression() {
    return this.expression
    .replace('+', ' + ')
    .replace('-', ' - ')
    .replace('/', ' / ')
    .replace('*', ' * ')
  }

  highlightButton(button: ElementRef) {
    if (this.highlightedButton) {
      this.highlightedButton.nativeElement.classList.remove('highlight');
    }
    button.nativeElement.classList.add('highlight');
    this.highlightedButton = button;
    setTimeout(()=>{
      this.highlightedButton.nativeElement.classList.remove('highlight');
    }, 100)
  }
  getButtonByKey(key: string): ElementRef | null {
    console.log(key)
    switch (key) {
      case '1':
        return this.one;
      case '2':
        return this.two;
      case '3':
        return this.three;
      case '4':
        return this.four;
      case '5':
        return this.five;
      case '6':
        return this.six;
      case '7':
        return this.seven;
      case '8':
        return this.eight;
      case '9':
        return this.nine;
      case '0':
        return this.zero;        
      case "+":
        return this.add;
      case "-":
        return this.subtract;
      case "/":
        return this.divide;
      case "*":
        return this.multiply;
      case "enter":
        return this.calculate;
      case "backspace":
        return this.delete;
      case "escape":
        return this.escape;
      case ".":
        return this.comma;
      default:
        return null;
    }
  }

  onNumberClick(number: string) {
    this.store.dispatch(new AddNumberToCalucator(number));
  }

  onOperatorClick(operator: string) {
    this.store.dispatch(new AddOperatorToCalucator(operator));
  }
  
  onDecimalClick(operator: string) {
    this.store.dispatch(new AddOperatorToCalucator(operator));
  }

  onClearClick() {
    this.store.dispatch(new ClearScreen());
  }

  onDelete() {
    this.store.dispatch(new DeleteInput());
  }

  onAddToMemory() {
    this.store.dispatch(new AddToMemory());
  }
  
  onClearMemory() {
    this.store.dispatch(new ClearMemory());
  }

  onEqualClick() {
    this.store.dispatch(new CalculateInput(this.expression));
  }

  onLoad() {
    this.store.select(memoryExpression).subscribe(expression => { 
      this.expression = expression;
    });
    this.onEqualClick();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const button = this.getButtonByKey((event.key.toLocaleLowerCase()));
    if (button) {
      this.highlightButton(button);
    }
    if (event.key >= '0' && event.key <= '9') {
      this.onNumberClick((event.key));
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      this.onOperatorClick(event.key);
    } else if (event.key.toLocaleLowerCase() === 'enter') {
      this.onEqualClick();
    } else if (event.key.toLocaleLowerCase() === 'backspace') {
      this.onDelete();
    } else if (event.key === '.') {
      this.onDecimalClick(event.key);
    } else if (event.key.toLocaleLowerCase() === 'escape') {
      this.onClearClick()
    }
  }

}
