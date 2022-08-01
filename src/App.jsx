import { useReducer } from 'react';
import './App.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

function DigitButton({ dispatch, digit, id, className }) {
  return (
    <button id={id} onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })} className={className} >
      {digit}
    </button>
  )
}

function OperationButton({ dispatch, operation, id }) {
  return (
    <button id={id} onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })} >
      {operation}
    </button>
  )
}

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          current: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.current === "0") {
        return state
      }
      if (payload.digit === "." && state.current.includes(".")) {
        return state
      } 
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.current == null && state.previous == null) {
          return state
        }

        if (state.current == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }

        if (state.previous == null) {
          return {
            ...state,
            operation: payload.operation,
            previous: state.current,
            current: null,
          }
        }

        return {
          ...state,
          previous: evaluate(state),
          operation: payload.operation,
          current: null
        }
      case ACTIONS.CLEAR:
        return {
          current: "0",
          overwrite: true,
        }
      case ACTIONS.EVALUATE:
        if (state.operation == null || state.current == null || state.previous == null) {
          return state
        }

        return {
          ...state,
          overwrite: true,
          previous: null,
          operation: null,
          current: evaluate(state)
        }
  }
}

function evaluate({ current, previous, operation}) {
  const prev = parseFloat(previous)
  const curr = parseFloat(current)
  if (isNaN(prev) || isNaN(curr)) return ""
  let calc = ""
  switch (operation) {
    case "+":
      calc = prev + curr
      break
    case "-":
      calc = prev - curr
      break
    case "*":
      calc = prev * curr
      break
    case "/":
      calc = prev / curr
      break
  }
  
  return calc.toString()
}

function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});

  return (
    <>
      <div className="calculator">
        <div id="display" className="output">
          <div className="previous">
            {previous} {operation}
          </div>
          <div className="current">{current}</div>
        </div>
        <button id="clear" onClick={() => dispatch({ type: ACTIONS.CLEAR })} className="col-span-two">
          AC
        </button>
        <OperationButton id="divide" operation="/" dispatch={dispatch} />
        <OperationButton id="multiply" operation="*" dispatch={dispatch} />
        <DigitButton id="seven" digit="7" dispatch={dispatch} />
        <DigitButton id="eight" digit="8" dispatch={dispatch} />
        <DigitButton id="nine" digit="9" dispatch={dispatch} />
        <OperationButton id="add" operation="+" dispatch={dispatch} />
        <DigitButton id="four" digit="4" dispatch={dispatch} />
        <DigitButton id="five" digit="5" dispatch={dispatch} />
        <DigitButton id="six" digit="6" dispatch={dispatch} />
        <OperationButton id="subtract" operation="-" dispatch={dispatch} />
        <DigitButton id="one" digit="1" dispatch={dispatch} />
        <DigitButton id="two" digit="2" dispatch={dispatch} />
        <DigitButton id="three" digit="3" dispatch={dispatch} />
        <DigitButton id="zero" digit="0" dispatch={dispatch} className="col-span-two" />
        <DigitButton id="decimal" digit="." dispatch={dispatch} />
        <button id="equals" onClick={() => dispatch({ type: ACTIONS.EVALUATE })} className="row-span-two">
          =
        </button>
      </div>
      <footer className="credit">
        <p className="">
          Made by{' '}
          <span className="">
            <a href="https://www.alfianahar.com/bio" target="_blank">
              Alfian Nahar
            </a>
          </span>
        </p>
      </footer>
    </>
  );
}

export default App;
