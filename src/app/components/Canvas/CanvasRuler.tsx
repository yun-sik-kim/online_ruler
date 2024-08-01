'use client'
import { useEffect, useRef } from 'react'
import { Ruler } from './Ruler';
import { Rectangle } from './Rectangle';
import styles from './CanvasRuler.module.css'

// type Rulertype = 'ruler' | 'rec' | 'circ';
// type RulerUnit = 'mm' | 'inch';

interface CanvasRulerProps {
    type: string;
    rulerUnit: string;
    userInput: number;
    deviceRatio: number;
    browserWidth: number;
    browserHeight: number;
}

export default function CanvasRuler({type, rulerUnit, userInput, deviceRatio, browserWidth, browserHeight}: CanvasRulerProps ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ratio = deviceRatio;
    const input = userInput;
    const unit= rulerUnit;

    // NOTE width and height ratio should be synchronous to CanvasRuler.module.css
    const width = browserWidth * 0.95;
    const height = browserHeight * 0.2;
    
    useEffect(()=>{
        if (canvasRef.current) {
            switch (type) {
                case 'ruler':
                    new Ruler(canvasRef.current, unit, ratio, input);
                    break;
                case 'rec':
                    new Rectangle(canvasRef.current, unit, ratio, input);
                    break;
            }
        }
    })

    return (
        <canvas 
            className={styles.canvas}
            ref={canvasRef} 
            width={width} 
            height={height}
        />
    )
}