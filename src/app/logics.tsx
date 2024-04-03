'use client'
import styles from "./ruler.module.css";
import { useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

export function MeasureInput({ className, children }) {
    const [lengthInput, setLengthInput] = useState('');
    const [inputMm, setInputMm] = useState(0);
    const [isInch, setIsInch] = useState(false);
    const accent_color3 = '#F9F871';

    const router = useRouter();

    useEffect(()=>{
      let input = document.querySelector(`.${styles.calculator_input}`);
      let checkbox = document.querySelector(`.${styles.to_inch_checkbox} h3`);

      // console.log(Number(lengthInput));
      // if (isInch === false && input.vlaue === '') {
        
      // }
      // if (isInch === true && input.value === '') {

      // }
      
      if (isInch === false) {
        input.placeholder = 'mm'
        checkbox.style.color = '';
        input.value = lengthInput;
      } else {
        input.placeholder = 'inch';
        checkbox.style.color = accent_color3;
        if (lengthInput > 0) {
          input.value = mmToInch(lengthInput);
        }
      }
    });

    const handleInputChange = (e) => {
      let input = e.target.value;
      setLengthInput(input);
    }
  
    const handleCalculateClick = (e) => {
      e.stopPropagation();

      if((Number(lengthInput) > 0)){
        let input = document.querySelector(`.${styles.calculator_input}`);
        if (isInch === false) {
          setInputMm(Number(input.value));
          alert(`success!!! input value in mmis ${input.value}`);
          router.push(`/calculate?length=${input.value}`);
        } else if (isInch === true) {
          setInputMm(Number(input.value));
          alert(`success!!! input value in inch is ${input.value}`);//FIX HERE
        }
        
      } else {
        alert("please write number above 0 only!");
        setLengthInput('');
      }
    };
  
    const handleInch = () => {
      setIsInch(!isInch);
    }

    function mmToInch(mm) {
      let result = mm / 25.4;
      return result.toFixed(2);
    }

    function inchToMm(inch) {
      return (inch * 25.4);
    }

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

    return (
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