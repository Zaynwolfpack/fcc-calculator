import './App.scss';
import { useState } from 'react';

function App() {
  const [expression, setExpression] = useState('0');
  const [answer, setAnswer] = useState("0");

  const display = (symbol) => {
    setExpression(prev => prev + symbol);
    setAnswer(symbol)

    const opReg = new RegExp('[/*+-.]');
    const sOpReg = new RegExp('[*/.+]');
    const dotReg = new RegExp('[*+/-]');
    const array = expression.split(dotReg);
    const currentNumber = array[array.length - 1];
    const posNegReg = new RegExp('[+-]');

    if(currentNumber === '0' && symbol === '0'){
        setExpression(expression.substr(0, expression.length))
    }

    
    if(currentNumber.includes('.') && symbol == '.'){
       setExpression(expression.substr(0, expression.length))
    }
    

    if(expression === '0'){
      setExpression(symbol);

      if(dotReg.test(symbol)){
        setExpression('0')
      }
      if(symbol === '.'){
        setExpression('0.')
      }
    }

    if(posNegReg.test(expression[expression.length-1]) && dotReg.test(expression[expression.length-2]) && opReg.test(symbol)){
      setExpression(expression.substr(0, expression.length))

      if(posNegReg.test(expression[expression.length-2]) && opReg.test(expression[expression.length-1])){
        setExpression(expression.substr(0, expression.length))
      }
    }

    if(opReg.test(expression[expression.length - 1]) && sOpReg.test(symbol)){
      setExpression(expression.replace(expression[expression.length - 1], symbol))

    }

    if(expression[expression.length - 1] == '='){
      const numberReg = new RegExp('[0-9.]')
      if(numberReg.test(symbol)){
        setExpression(symbol)
      } else {
        setExpression(answer + symbol);
      }
    }
  }
 
  const calculate = () => {
    setAnswer(eval(expression));
    setExpression((prev) => prev + "=")
  }

  const allClear = () => {
    setExpression('0')
    setAnswer('0')
  }
 
  return (
    <div className="App">
      <body>
        <div className='calculator'>
          <div className="outputScreen" id='display'>{answer}</div>
          <div className="formulaScreen" id="Exdisplay" >
             {expression}
          </div>
          <div className='grid'>
            <button onClick={allClear} value='AC' id='clear' >AC</button>
            <button onClick={() => display('-')} id='subtract' value='-' >-</button>
            <button onClick={() => display('+')} id='add' value='+' >+</button>
            <button onClick={() => display('7')} id='seven' value='7' >7</button>
            <button onClick={() => display('8')} id='eight' value='8' >8</button>
            <button onClick={() => display('9')} id='nine' value='9' >9</button>
            <button onClick={() => display('/')} id='divide' value="/" >/</button>
            <button onClick={() => display('4')} id='four' value='4' >4</button>
            <button onClick={() => display('5')} id='five' value='5' >5</button>
            <button onClick={() => display('6')} id='six' value='6' >6</button>
            <button onClick={() => display('*')} id='multiply' value='*' >x</button>
            <button onClick={() => display('1')} id='one' value='1' >1</button>
            <button onClick={() => display('2')} id='two' value='2' >2</button>
            <button onClick={() => display('3')} id='three' value='3' >3</button>
            <button onClick={() => display('0')} id='zero' value='0' >0</button>
            <button onClick={() => display('.')} id='decimal' value='.'  >.</button>
            <button onClick={calculate} id='equals' value='=' >=</button>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
