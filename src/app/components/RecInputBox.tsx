'use client'
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import styles from "./InputBox.module.css";

export default function RecInputBox({ children }: { children: ReactNode }) {
    // const [inputValue, setInputValue] = useState('');
    const [inputWidth, setInputWidth] = useState('');
    const [inputHeight, setInputHeight] = useState('');
    const [isInch, setIsInch] = useState(false);
    const [initialUnit, setInitialUnit] = useState<'mm' | 'inch'>('mm');
    const router = useRouter();

    const toggleUnit = () => {
      setIsInch((prevIsInch) => {
        const newIsInch = !prevIsInch;
        if (inputWidth !== '' && inputHeight !== '') {
          setInputWidth(newIsInch ? mmToInch(inputWidth) : inchToMm(inputWidth));
          setInputHeight(newIsInch ? mmToInch(inputHeight) : inchToMm(inputHeight));
        }
        return newIsInch;
      });
    };

    const handleCalculate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();

      if((parseFloat(inputWidth) > 0) || (parseFloat(inputHeight) > 0)){
        if (!isInch) {
          alert(`success!!! input value in mm is ${inputWidth} and ${inputHeight}`);
          router.push(`/rectangle/calculate?type=rec&inch=${isInch}&width=${inputWidth}&height=${inputHeight}`);
        } else {
          alert(`success!!! input value in inch is ${inputWidth} and ${inputHeight}`);
          router.push(`/rectangle/calculate?type=rec&inch=${isInch}&width=${inputWidth}&height=${inputHeight}`);
        }
      } else {
        alert("please write number above 0 only!");
        setInputWidth('');
        setInputHeight('');
      }
    };

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue === '') {
        setInputWidth('');
        setInitialUnit(isInch ? 'inch' : 'mm');
      } else {
        setInputWidth(newValue);
      }
    }

    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue === '') {
        setInputHeight('');
        setInitialUnit(isInch ? 'inch' : 'mm');
      } else {
        setInputHeight(newValue);
      }
    }

    const getPlaceholder = () => isInch ? 'inch' : 'mm';

    const getDisplayWidth = () => inputWidth;
    const getDisplayHeight = () => inputHeight;

    function mmToInch(mm: string) {
      let result = parseFloat(mm) / 25.4;
      return String(result.toFixed(6));
    }

    function inchToMm(inch: string) {
      let result = parseFloat(inch) * 25.4;
      return String(result.toFixed(2));
    }

    return (
        <div className={styles.calculate_box}>
            <div className={styles.input_box}>
                <input
                    type="text"
                    className={styles.calculator_input}
                    placeholder={`(width) ${getPlaceholder()}`}
                    value={getDisplayWidth()}
                    onChange={handleWidthChange}
                />
                <input
                    type="text"
                    className={styles.calculator_input}
                    placeholder={`(height) ${getPlaceholder()}`}
                    value={getDisplayHeight()}
                    onChange={handleHeightChange}
                />
            </div>
            <button onClick={handleCalculate}>
                calculate!
            </button>
            <div className={`${styles.to_inch_checkbox} ${isInch ? styles.highlight : ''}`}>
                <input type="checkbox" checked={isInch} onChange={toggleUnit} />
                {children}
            </div>
        </div>
    );
}