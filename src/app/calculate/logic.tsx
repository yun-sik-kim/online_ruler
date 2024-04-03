'use client'
import styles from "./calculate.module.css";
import { useState, Fragment, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

// setTimeout(()=>{
//     const title = document.querySelector(`.${styles.ui_layout} h1`);
//     title.innerHTML = 'online ruler';
//     // alert(title);
// }, 1000);

export function MeasureInput({ className, children }) {
    const [lengthInput, setLengthInput] = useState('');
    const [inputMm, setInputMm] = useState(0);
    const [isInch, setIsInch] = useState(false);
    const accent_color3 = '#F9F871';

    const router = useRouter();

    useEffect(()=>{
      let input = document.querySelector(`.${styles.calculator_input}`);
      let checkbox = document.querySelector(`.${styles.to_inch_checkbox} h3`);

      console.log(Number(lengthInput));
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
          router.push('/calculate');
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


//TO DO: set a timer that initial looks like main page, and pop up the ShowRuler with visual while scroll down.
export function ShowRuler({ inputInArray, rulerType }) {
    const searchParams = useSearchParams();
    const length = searchParams.get('length');

    useEffect(()=>{
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        console.log(screenWidth + '+' + screenHeight);

        const devicePixelRatio = window.devicePixelRatio;

        const physicalWidthInPixels = screenWidth * devicePixelRatio;
        const physicalHeightInPixels = screenHeight * devicePixelRatio;

        const physicalWidthInInches = physicalWidthInPixels / 96;
        const physicalHeightInInches = physicalHeightInPixels / 96;

        const physicalWidthInMm = physicalWidthInInches * 25.4;
        const physicalHeightInMm = physicalHeightInInches * 25.4;

        console.log(physicalWidthInMm + '+' +physicalHeightInMm);

        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");

        // Set line properties
        ctx.strokeStyle = "blue"; // Line color
        ctx.lineWidth = 2; // Line width

        // Draw a line from (10, 30) to (190, 30)
        ctx.beginPath();
        ctx.moveTo(10, 100);
        ctx.lineTo( 204 + 10, 100);
        ctx.stroke();
    });

    if (rulerType === 'ruler') {

    } else if (rulerType === 'box') {

    }

    return (
        <div className={styles.show_ruler_layout}>
            <canvas id="myCanvas" width="500" height="200" style={{ border: '1px solid #000' }}></canvas>
        </div>
    );
}