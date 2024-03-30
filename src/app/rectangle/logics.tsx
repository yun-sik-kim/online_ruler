'use client'
import styles from "./rectangle.module.css";
import { useState, Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

export function MeasureInput({ className, children }) {
    const [widthInput, setWidthInput] = useState('');
    const [heightInput, setHeightInput] = useState('');
    const [isInch, setIsInch] = useState(false);
  
    const accent_color3 = '#F9F871';
  
    const handleWidthChange = (e) => {
      let input = e.target.value;
      setWidthInput(input);
      console.log(`you have wrote: ${input}`);
    }
    const handleHeightChange = (e) => {
      let input = e.target.value;
      setHeightInput(input);
      console.log(`you have wrote: ${input}`);
    }
  
    const handleCalculateClick = (e) => {
      e.stopPropagation();
      if (!Number.isInteger(Number(widthInput)) && !Number.isInteger(Number(heightInput))){
        alert("please write number only!");
        setWidthInput('');
        setHeightInput('');
        console.log(`${widthInput} ${heightInput}`);
      } else if (widthInput === '' || widthInput === '0') {
        alert("width must be larger than 0!");
        setWidthInput('');
        setHeightInput('');
      } else if (heightInput === '' || heightInput === '0') {
        alert("height must be larger than 0!");
        setWidthInput('');
        setHeightInput('');
      } else {
        alert("success!!!");
        setWidthInput(widthInput);
        setHeightInput(heightInput);
        console.log(`${widthInput} ${heightInput}`);
      }
    };
  
    const handleInch = () => {
      setIsInch(!isInch);
    }

    useEffect(()=>{
      const inputPlaceholders = document.querySelectorAll(`.${styles.calculator_input}`);

      if(isInch) {
        inputPlaceholders.forEach((input) => {input.setAttribute('placeholder', 'inch');});
        document.querySelector(`.${styles.to_inch_checkbox} h3`).style.color = accent_color3;
      } else {
        inputPlaceholders.forEach((input) => {input.setAttribute('placeholder', 'mm');});
        document.querySelector(`.${styles.to_inch_checkbox} h3`).style.color = '';
      }
    });

    return (
        <div className={className}>
          <div className={styles._2d_box}>
            <input
              className={styles.calculator_input}
              onChange={ handleWidthChange }
              type="text"
              placeholder="mm"
              value={widthInput}
              >
            </input>
            <input
              className={styles.calculator_input}
              onChange={ handleHeightChange }
              type="text"
              placeholder="mm"
              value={heightInput}
              >
            </input>
          </div>
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