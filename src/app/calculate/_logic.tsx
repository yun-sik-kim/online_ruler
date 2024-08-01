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
        const displaySizeList = [10.1, 11.6, 12.3, 12.5, 13, 13.3, 13.5, 14, 14.5, 15, 15.6, 16, 17, 17.3, 18.4, 20, 21.5, 23, 24, 27, 32, 34, 38, 42, 49, 55, 65];
        const macDisplaySizeList = [9.7, 10.2, 10.5, 10.9, 11.0, 12.9, 11.6, 12.0, 13.3, 14.0, 15.4, 16.0, 17.0, 21.5, 24.0, 27.0];
        const displayAspectRatio = [[16, 9], [16, 10], [4, 3], [5, 4], [21, 9], [32, 9]];
        const ARdevisionTable = displayAspectRatio.map((ratio)=>{
            return (ratio[0] / ratio[1])
        });
        // console.log(ARdevisionTable);
        function findDisplaySize() {
            const width = window.screen.width;
            const height = window.screen.height;
            console.log(`Your screen resolution is ${window.screen.width} x ${window.screen.height}.`);
            const diagonal = Math.sqrt(width ** 2 + height ** 2);
            console.log('diagonal: ' + diagonal);

            if (navigator.platform.indexOf("Mac") === 0) {
                const likelihoodIndex = macDisplaySizeList.map((size)=>{
                    return Math.abs( (diagonal % size)-size); //NEED FIX: find similarity function
                });
                likelihoodIndex.map((a, i)=>{
                    console.log(`${macDisplaySizeList[i]} inch is: ${likelihoodIndex[i]}`);
                })
                const minValue = Math.min(...likelihoodIndex);
                const minIndex = likelihoodIndex.indexOf(minValue);
                console.log(`your screen is: ${macDisplaySizeList[minIndex]} inch`);
            } else {
                const likelihoodIndex = displaySizeList.map((size)=>{
                    return Math.abs(size - (diagonal % size)); //NEED FIX: find similarity function
                });
                likelihoodIndex.map((a, i)=>{
                    console.log(`${displaySizeList[i]} inch is: ${likelihoodIndex[i]}`);
                })
                const minValue = Math.min(...likelihoodIndex);
                const minIndex = likelihoodIndex.indexOf(minValue);
                console.log(`your screen is: ${displaySizeList[minIndex]} inch`);
            }

            
        }
        findDisplaySize();

        function findAR(aspectRatio) {
            const nativeWidth = window.screen.width * window.devicePixelRatio;
            const nativeHeight = window.screen.height * window.devicePixelRatio;
            const currentRatio = nativeWidth / nativeHeight;
            console.log('current Ratio: '+ currentRatio);

            const likelihoodIndex = aspectRatio.map((a, i)=>{
                return Math.abs(currentRatio - ARdevisionTable[i]);
            });
            console.log(likelihoodIndex);
            const minValue = Math.min(...likelihoodIndex);
            console.log(minValue);
            const currentARIndex = likelihoodIndex.indexOf(minValue);
            console.log(currentARIndex)
            const currentAR = aspectRatio[currentARIndex]
            console.log(`Aspect Ratio is: ${currentAR[0]} x ${currentAR[1]}.`);
        }
        findAR(displayAspectRatio);

        function findPhysicalMm(displaySize, AR) {
            const physicalHeight = inchToMm(displaySize) / (Math.sqrt(AR ** 2 + 1));
            const physicalWidth = AR * physicalHeight;
            console.log(`your computer's physical width is:${physicalWidth} and height is: ${physicalHeight}`);
        }
        

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