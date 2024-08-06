'use client'
import { useEffect, useRef } from 'react'
import { Ruler } from './Ruler';
import { Rectangle } from './Rectangle';
import { Circle } from './Circle'
import styles from './CanvasRuler.module.css'

// type Rulertype = 'ruler' | 'rec' | 'circ';
// type RulerUnit = 'mm' | 'inch';

interface CanvasRulerProps {
    type: string;
    rulerUnit: string;
    userInput: number[];
    drawingScale: number;
    browserWidth: number;
    browserHeight: number;
}

export default function CanvasRuler({type, rulerUnit, userInput, drawingScale, browserWidth, browserHeight}: CanvasRulerProps ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ratio = drawingScale;
    const input: number[] = userInput;
    const unit= rulerUnit;

    console.log(`CanvasRuler.tsx scale is: ${ratio}`);

    // NOTE width and height ratio should be synchronous to CanvasRuler.module.css
    const width = browserWidth * 0.95;
    const height = type === 'ruler' ? browserHeight * 0.2 : browserHeight;
    let canvasClassName;
    
    useEffect(()=>{
        if (canvasRef.current) {
            switch (type) {
                case 'ruler':
                    new Ruler(canvasRef.current, width, height, unit, ratio, input[0]);
                    canvasClassName = styles.canvas_ruler;
                    break;
                case 'rec':
                    new Rectangle(canvasRef.current, width, height, unit, ratio, input[1], input[2]);
                    canvasClassName = styles.canvas_2d;
                    break;
                case 'circ':
                    new Circle(canvasRef.current, width, height, unit, ratio, input[0]);
                    canvasClassName = styles.canvas_2d;
                    break;
            }
        }
    }, [input])

    return (
        <canvas 
            className={type === 'ruler' ? styles.canvas_ruler : styles.canvas_2d}
            ref={canvasRef} 
            width={width} 
            height={height}
        />
    )
}