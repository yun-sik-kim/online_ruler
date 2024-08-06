'use client'
import { useState, ReactNode, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from "./InputBox.module.css";

export default function RecInputBox({ children }: { children: ReactNode }) {
    // const [inputValue, setInputValue] = useState('');
    const [inputWidth, setInputWidth] = useState('');
    const [inputHeight, setInputHeight] = useState('');
    const [isInch, setIsInch] = useState(false);
    const [initialUnit, setInitialUnit] = useState<'mm' | 'inch'>('mm');
    const router = useRouter();
    const searchParams = useSearchParams();

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
          // alert(`success!!! input value in mm is ${inputWidth} and ${inputHeight}`);
          router.push(`/rectangle/calculate?type=rec&inch=${isInch}&width=${inputWidth}&height=${inputHeight}`);
        } else {
          // alert(`success!!! input value in inch is ${inputWidth} and ${inputHeight}`);
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

    const getWidthPlaceholder = () => {
      const width = searchParams.get('width') || null;

      if (width === null) {
        if (isInch) {
          return 'inch'
        } else {
          return 'mm'
        } 
      } else {
        if (isInch) {
          return `${width.toString()}inch`
        } else {
          return `${width.toString()}mm`
        } 
      }
    }

    const getHeightPlaceholder = () => {
      const height = searchParams.get('height') || null;

      if (height === null) {
        if (isInch) {
          return 'inch'
        } else {
          return 'mm'
        } 
      } else {
        if (isInch) {
          return `${height.toString()}inch`
        } else {
          return `${height.toString()}mm`
        } 
      }
    }


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
                    placeholder={getWidthPlaceholder()}
                    value={getDisplayWidth()}
                    onChange={handleWidthChange}
                />
                <input
                    type="text"
                    className={styles.calculator_input}
                    placeholder={getHeightPlaceholder()}
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