'use client'
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CanvasRuler from './Canvas/CanvasRuler';
import { motion } from "framer-motion"

import styles from "./RulerUI.module.css";

const STORAGE_KEY = 'calibrationData';

//TO DO: set a timer that initial looks like main page, 
// and pop up the ShowRuler with visual while scroll down.
export default function RulerUI() {
    const searchParams = useSearchParams();

    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);
    const [ratio, setRatio] = useState(0);
    let userInput: number[] = [NaN, NaN, NaN];  // 1: inputLength 2: inputWidth 3: inputHeight
    const unit = (searchParams.get('inch') === 'false') ? 'mm' : 'inch';
    const type = searchParams.get('type') || 'ruler';
    //TODO: use this ratio to adjust ruler length

    if (searchParams.get('length')) {
      userInput[0] = Number(searchParams.get('length')) || 0;
      console.log(`userInput[0] is: ${userInput[0]}`)
    } else if (searchParams.get('width')) {
      userInput[1] = Number(searchParams.get('width')) || 0;
      userInput[2] = Number(searchParams.get('height')) || 0;
    }

    useEffect(()=>{
      // const diagonal = findDisplaySize();
      // const AR = findAR();
      // const AR = estimateScreenSizeFromRatio();

      // const height = calculateHeight(diagonal, AR);
      // const Width = calculateWidth(height, AR);

        // const displaySizeList = [10.1, 11.6, 12.3, 12.5, 13, 13.3, 13.5, 14, 14.5, 15, 15.6, 16, 17, 17.3, 18.4, 20, 21.5, 23, 24, 27, 32, 34, 38, 42, 49, 55, 65];
        // const macDisplaySizeList = [9.7, 10.2, 10.5, 10.9, 11.0, 12.9, 11.6, 12.0, 13.3, 14.0, 15.4, 16.0, 17.0, 21.5, 24.0, 27.0];
        // const displayAspectRatio = [[16, 9], [16, 10], [4, 3], [5, 4], [21, 9], [32, 9]];
        // const ARdevisionTable = displayAspectRatio.map((ratio)=>{
        //     return (ratio[0] / ratio[1])
        // });

        // // console.log(ARdevisionTable);
        // findAR(displayAspectRatio);

        // function findPhysicalMm(displaySize, AR) {
        //     const physicalHeight = inchToMm(displaySize) / (Math.sqrt(AR ** 2 + 1));
        //     const physicalWidth = AR * physicalHeight;
        //     console.log(`your computer's physical width is:${physicalWidth} and height is: ${physicalHeight}`);
        // }

        setScreenWidth(window.screen.width);
        setScreenHeight(window.screen.height);

         // Load data from localStorage when component mounts
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            const parsedData = parseFloat(storedData);
            console.log(`RulerUI.tsx storedData is: ${storedData}`)
            if (!isNaN(parsedData)) {
              setRatio(parsedData);
              console.log(`RulerUI.tsx parsedData is: ${parsedData}`)
              console.log(`RulerUI.tsx ratio is: ${ratio}`)
            }
        }
    }, []);


    return (
        <div className={styles.ruler_ui_layout}>
            <div className={styles.ruler_box}>
            <CanvasRuler 
              type={type} 
              rulerUnit={unit} 
              userInput={userInput}
              deviceRatio={ratio} 
              browserWidth={screenWidth} 
              browserHeight={screenHeight} 
            />
            </div>
        </div>
    );
}

function calculateHeight(diagonal: number, AR: number) {
  return diagonal / ( Math.sqrt(AR^2 + 1) );
}

function calculateWidth(height: number, AR: number) {
  return AR * height;
}

function findDisplaySize() {
    const width = window.screen.width;
    const height = window.screen.height;
    let longerSide = '';

    // change horizontal to 
    if (width > height) {
      longerSide = 'width';
    } else {
      longerSide = 'height';
    }

    console.log(`Your screen resolution is ${window.screen.width} x ${window.screen.height}.`);
    const diagonal = Math.sqrt(width ** 2 + height ** 2);
    console.log(`diagonal: ${diagonal}`);

    console.log(window.navigator.userAgent);

    // if (navigator.userAgentData.indexOf("Mac") === 0) {
    //     const likelihoodIndex = macDisplaySizeList.map((size)=>{
    //         return Math.abs( (diagonal % size)-size); //NEED FIX: find similarity function
    //     });
    //     likelihoodIndex.map((a, i)=>{
    //         console.log(`${macDisplaySizeList[i]} inch is: ${likelihoodIndex[i]}`);
    //     })
    //     const minValue = Math.min(...likelihoodIndex);
    //     const minIndex = likelihoodIndex.indexOf(minValue);
    //     console.log(`your screen is: ${macDisplaySizeList[minIndex]} inch`);
    // } else {
    //     const likelihoodIndex = displaySizeList.map((size)=>{
    //         return Math.abs(size - (diagonal % size)); //NEED FIX: find similarity function
    //     });
    //     likelihoodIndex.map((a, i)=>{
    //         console.log(`${displaySizeList[i]} inch is: ${likelihoodIndex[i]}`);
    //     })
    //     const minValue = Math.min(...likelihoodIndex);
    //     const minIndex = likelihoodIndex.indexOf(minValue);
    //     console.log(`your screen is: ${displaySizeList[minIndex]} inch`);
    // }
  return diagonal
}

function estimateScreenSizeFromRatio() {
  const logicalWidth = window.screen.width;
  const logicalHeight = window.screen.height;

  // Get the device pixel ratio
  const pixelRatio = window.devicePixelRatio || 1;

  // Calculate the actual resolution
  const actualWidth = logicalWidth * pixelRatio;
  const actualHeight = logicalHeight * pixelRatio;

  // Common diagonal sizes in inches
  const commonSizes = [11, 13, 14, 15.4, 15.6, 17, 21, 23, 24, 27, 32];
  const macDisplays = [
    { size: 11.6, resolution: [1366, 768], years: "2015", model: "MacBook Air" },
    { size: 12, resolution: [2304, 1440], years: "2015-2019", model: "MacBook" },
    { size: 13.3, resolution: [2560, 1600], years: "2015-present", model: "MacBook Air/Pro" },
    { size: 13.6, resolution: [2560, 1664], years: "2022-present", model: "MacBook Air M2" },
    { size: 14.2, resolution: [3024, 1964], years: "2021-present", model: "MacBook Pro" },
    { size: 15.3, resolution: [2880, 1864], years: "2023-present", model: "MacBook Air M2" },
    { size: 15.4, resolution: [2880, 1800], years: "2015-2019", model: "MacBook Pro" },
    { size: 16, resolution: [3072, 1920], years: "2019-2021", model: "MacBook Pro" },
    { size: 16.2, resolution: [3456, 2234], years: "2021-present", model: "MacBook Pro" },
    // iMac models
    { size: 21.5, resolution: [1920, 1080], years: "2015-2019", model: "iMac" },
    { size: 21.5, resolution: [4096, 2304], years: "2015-2021", model: "iMac 4K" },
    { size: 24, resolution: [4480, 2520], years: "2021-present", model: "iMac M1" },
    { size: 27, resolution: [5120, 2880], years: "2015-2022", model: "iMac 5K" }
  ];

  macDisplays.forEach((model)=>{
    const result = model.resolution[0] / model.resolution[1];
    console.log(`model: ${model.model}, years: ${model.years}, size: ${model.size} ${result}`);
  })

  // Find the closest match
  let closestMatch = macDisplays[0];
  let smallestDifference = Math.abs(actualWidth - macDisplays[0].resolution[0]) + Math.abs(actualHeight - macDisplays[0].resolution[1]);

  for (let display of macDisplays) {
    const difference = Math.abs(actualWidth - display.resolution[0]) + Math.abs(actualHeight - display.resolution[1]);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestMatch = display;
    }
  }

  console.log(`closest size is: ${closestMatch.size}`)


}

function findAR() {
    const nativeWidth = window.screen.width * window.devicePixelRatio;
    const nativeHeight = window.screen.height * window.devicePixelRatio;
    const currentRatio = nativeWidth / nativeHeight;

    return currentRatio;
}
