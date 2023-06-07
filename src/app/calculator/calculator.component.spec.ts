import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalculatorState } from '../store/calculator.state';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let mockStore: Partial<Store<CalculatorState>>;

  beforeEach((() => {
    mockStore = {
      select: jasmine.createSpy().and.returnValue({
        subscribe: jasmine.createSpy()
      }),
      dispatch: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
      providers: [{ provide: Store, useValue: mockStore }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  }));

  afterEach(() => {
    (mockStore.dispatch as jasmine.Spy).and.callThrough();   
  });

  it('should format the expression correctly in viewExpression', () => {
    component.expression = '2+3-4/2*5';
    const result = component.viewExpression;
    expect(result).toEqual('2 + 3 - 4 / 2 * 5');
  });

  it('should not modify the expression if it does not contain any operators', () => {
    component.expression = '42';
    const result = component.viewExpression;
    expect(result).toEqual('42');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight a button when calling highlightButton', () => {
    const button: ElementRef = {
      nativeElement: {
        classList: {
          remove: jasmine.createSpy(),
          add: jasmine.createSpy()
        }
      }
    };
    component.highlightedButton = null;
    component.highlightButton(button);
    expect(button.nativeElement.classList.add).toHaveBeenCalledWith('highlight');
    expect(component.highlightedButton).toEqual(button);
  });

  it('should retrieve the correct button element by key', () => {
    const button: ElementRef = {
      nativeElement: {}
    };

    component.one = button;
    const retrievedButton = component.getButtonByKey('1');
    expect(retrievedButton).toEqual(button);
  });


  it('should dispatch AddNumberToCalucator action when calling onNumberClick', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    const number = '5';
    component.onNumberClick(number);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch AddOperatorToCalucator action when calling onOperatorClick', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    const operator = '+';
    component.onOperatorClick(operator);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch AddOperatorToCalucator action when calling onDecimalClick', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    const operator = '.';
    component.onDecimalClick(operator);
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch ClearScreen action when calling onClearClick', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    component.onClearClick();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch DeleteInput action when calling onDelete', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    component.onDelete();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch AddToMemory action when calling onAddToMemory', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    component.onAddToMemory();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch ClearMemory action when calling onClearMemory', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    component.onClearMemory();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch CalculateInput action when calling onEqualClick', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    component.expression = '2+3';
    component.onEqualClick();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should select memoryExpression from the store when calling onLoad', async(() => {
    const subscribeSpy = mockStore.select as jasmine.Spy;
    component.onLoad();
    fixture.whenStable().then(() => {
      expect(subscribeSpy).toHaveBeenCalled();
    });
  }));  

  it('should handle keyboard events correctly', () => {
    const dispatchSpy = mockStore.dispatch as jasmine.Spy;
    const mockEvent: KeyboardEvent = new KeyboardEvent('keydown', {
      key: '1'
    });  
    component.handleKeyboardEvent(mockEvent);
    expect(dispatchSpy).toHaveBeenCalled();
  });

});
