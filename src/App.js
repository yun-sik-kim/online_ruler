import { Button } from 'bootstrap';
import './App.css';

import { useState } from 'react';
import { Fragment } from 'react';
import { ReactComponent as Logo } from './ys.svg';

export default function App(){
  return (
    <div className='main-layout'>
      <nav className='nav_bar'>
        {/* <img src='ys.svg' className='app_logo' /> */}
        <Logo className='app_logo'/>
      </nav>
      <CalculatorInputLayout />
      {/* <ShowRuler>
      </ShowRuler> */}
    </div>
  );
}

function CalculatorInputLayout() {
  const [lengthInput, setLengthInput] = useState('');
  const [isInch, setIsInch] = useState('false');

  const accent_color3 = '#F9F871';

  const handleInputChange = (e) => {
    let input = e.target.value;
    setLengthInput(input);
    console.log(`you have wrote: ${input}`);
  }

  const handleCalculateClick = (e) => {
    e.stopPropagation();
    if(!Number.isInteger(Number(lengthInput))){
      alert("please write number only!");
      setLengthInput('');
      console.log(lengthInput);
    } else {
      alert("success!!!");
      setLengthInput(lengthInput);
      console.log(lengthInput);
    }
  };

  const handleInch = () => {
    setIsInch(!isInch);
    if(isInch) {
      document.querySelector('#calculator-input').placeholder = 'inch';
      document.querySelector('.to_inch_box h3').style.color = accent_color3;
    } else {
      document.querySelector('#calculator-input').placeholder = 'mm'
      document.querySelector('.to_inch_box h3').style.color = '';
    }
  }

  return(
    <div className='calculator_layout'>
      <h1>Measure anything, anywhere with our handy online ruler!</h1>

      <div className='calculate_box'>
        <input
          id='calculator-input'
          onChange={ handleInputChange }
          type="text"
          placeholder="mm"
          value={lengthInput}
          >
        </input>
        <button onClick={ handleCalculateClick }>
          calculate!
        </button>
        <div className='to_inch_box'>
          <input type="checkbox" onClick={ handleInch } />
          <h3>to inch</h3>
        </div>
        
      </div>
      <HelpLayout />
      
      <RulerNav />
    </div>
  );
}

function HelpLayout() {
  const [isHelp, setIsHelp] = useState(false);

  // const onHelpClicked = () => {
  //   setIsHelp(!isHelp);
  //   if(isHelp) {
  //     document.querySelector('.help-details').style.visibility = 'visible';
  //   } else {
  //     document.querySelector('.help-details').style.visibility = 'hidden';
  //   }
  // }
  return(
    <div className="help-layout"
      // onClick={ onHelpClicked }
      onMouseEnter={()=>{document.querySelector('.help-details').style.visibility = 'visible';}}
      onMouseLeave={()=>{document.querySelector('.help-details').style.visibility = 'hidden';}}
    >
      <i class="fa-solid fa-circle-question" draggable="false"></i><span draggable="false">  cm?</span>
      <div className='help-details'>
        <h3>• cm to mm?</h3>
        <p>1 cm = 10 mm</p>
        <h3>• m to mm?</h3>
        <p>1 m = 100 mm</p>
      </div>
      
    </div>
  );
}

function ShowRuler({ children }) {

  return(
    <div className='show_ruler-layout'>
      <div className='place_holder'></div>
      {children}
    </div>
  );
}

function RulerNav() {

  return(
    <div id='ruler_nav-layout'>
      <nav>
        <a href=''>
          <i class="fa-solid fa-ruler"></i>
          <h3>ruler</h3>
          <p>shows straight line</p>
        </a>
        <a href=''>
        <i class="fa-regular fa-square"></i>
          <h3>2d box</h3>
          <p>2d rectangle, set your width and height</p>
        </a>
        <a href=''>
          <i class="fa-regular fa-circle"></i> 
          <h3>2d circle</h3>
          <p>round circle</p>
        </a>
        <a href=''>
          <i class="fa-solid fa-cube"></i>
          <h3>3d box (coming soon)</h3>
          <p>3d rectangle, set your width, height and length</p>
        </a>
      </nav>
    </div>
  );
}