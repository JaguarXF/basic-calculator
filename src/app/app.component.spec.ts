import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { StoreModule } from '@ngrx/store';
import { calculatorReducer } from './store/calculator.reducer';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent, CalculatorComponent],
    imports: [StoreModule.forRoot({}), StoreModule.forFeature('calculator', calculatorReducer)],

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'basic-calculator'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('basic-calculator');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('basic-calculator app is running!');
  });
});
