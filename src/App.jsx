import './App.css';

function App() {
  return (
    <>
    <div className="calculator">
      <div id="display" className="output">
        <div className="previous">1123,1123 +</div>
        <div className="current">245,3345</div>
      </div>
      <button id="clear" className="col-span-two">
        AC
      </button>
      <button id="divide">/</button>
      <button id="multiply">*</button>
      <button id="seven">7</button>
      <button id="eight">8</button>
      <button id="nine">9</button>
      <button id="add">+</button>
      <button id="four">4</button>
      <button id="five">5</button>
      <button id="six">6</button>
      <button id="subtract">-</button>
      <button id="one">1</button>
      <button id="two">2</button>
      <button id="three">3</button>
      <button id="zero" className="col-span-two">0</button>
      <button id="decimal">.</button>
      <button id="equals" className="row-span-two">=</button>
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
