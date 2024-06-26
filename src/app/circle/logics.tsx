'use client'
import styles from "./circle.module.css";
import { useState, Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

export function MeasureInput({ className, children }) {
    const [lengthInput, setLengthInput] = useState('');
    const [isInch, setIsInch] = useState(false);
  
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
      } else if(lengthInput === '' || lengthInput === '0') {
        alert("number must be larger than 0!");
        setLengthInput('');
      } else {
        alert("success!!!");
        setLengthInput(lengthInput);
        console.log(lengthInput);
      }
    };
  
    const handleInch = () => {
      setIsInch(!isInch);
    }
    useEffect(()=>{
      if(isInch) {
        document.querySelector(`.${styles.calculator_input}`).placeholder = 'inch';
        document.querySelector(`.${styles.to_inch_checkbox} h3`).style.color = accent_color3;
      } else {
        document.querySelector(`.${styles.calculator_input}`).placeholder = 'mm'
        document.querySelector(`.${styles.to_inch_checkbox} h3`).style.color = '';
      }
    });

    return (
        <div className={className}>
          <input
            className={styles.calculator_input}
            onChange={ handleInputChange }
            type="text"
            placeholder="mm"
            value={lengthInput}
            >
          </input>
          <button onClick={ handleCalculateClick }>
            calculate!
          </button>
          <div className={styles.to_inch_checkbox}>
            <input type="checkbox" onClick={ handleInch } />
            {children}
          </div>     
        </div>
    );
}

export function Tooltip({ className, children }) {
    const [isHelp, setIsHelp] = useState(false);

    return(
      <div className={className}
        onMouseEnter={()=>{document.querySelector(`.${styles.details_tooltip}`).style.visibility = 'visible';}}
        onMouseLeave={()=>{document.querySelector(`.${styles.details_tooltip}`).style.visibility = 'hidden';}}>
        <FontAwesomeIcon icon={faCircleQuestion} /><span draggable="false">  cm?</span>
        <div className={styles.details_tooltip}>
          {children}
        </div>
      </div>
    );
}