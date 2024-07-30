'use client'
import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./InputBox.module.css";

export function InputBox({ children }: { children: ReactNode }) {
    const [inputValue, setInputValue] = useState('');
    const [isInch, setIsInch] = useState(false);
    const [initialUnit, setInitialUnit] = useState<'mm' | 'inch'>('mm');
    const router = useRouter();

    const toggleUnit = () => {
      setIsInch((prevIsInch) => {
        const newIsInch = !prevIsInch;
        if (inputValue !== '') {
          setInputValue(newIsInch ? mmToInch(inputValue) : inchToMm(inputValue));
        }
        return newIsInch;
      });
    };

    const handleCalculate = (e) => {
      e.stopPropagation();

      if((parseFloat(inputValue) > 0)){
        if (!isInch) {
          alert(`success!!! input value in mm is ${inputValue}`);
          router.push(`/calculate?inch=${isInch}&length=${inputValue}`);
        } else {
          alert(`success!!! input value in inch is ${inputValue}`);
          router.push(`/calculate?inch=${isInch}&length=${inputValue}`);
        }
        
      } else {
        alert("please write number above 0 only!");
        setInputValue('');
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue === '') {
        setInputValue('');
        setInitialUnit(isInch ? 'inch' : 'mm');
      } else {
        setInputValue(newValue);
      }
    }

    const getPlaceholder = () => isInch ? 'inch' : 'mm';

    const getDisplayValue = () => inputValue;

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
          <input
            type="text"
            className={styles.calculator_input}
            placeholder={getPlaceholder()}
            value={getDisplayValue()}
            onChange={handleInputChange}
          />
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