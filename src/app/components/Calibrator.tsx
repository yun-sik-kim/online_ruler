'use client'
import { useState, useEffect, ReactNode } from 'react';
import styles from './Calibrator.module.css'
import Image from 'next/image';

const STORAGE_KEY = 'calibrationData';

export default function Calibrator() {
    const MULTIPLY_CONSTANT = 86.5;
    const USB_A_CONSTANT = 30;
    const USB_C_CONSTANT = 22;
    // >>>FIX<<< change min and MAX_VAR after test to different monitor sizes!
    const MIN_VAR = 2.352;
    const MAX_VAR = 6.250;

    const [calibrationData, setCalibrationData] = useState('');
    const [toggleSetting, setToggleSetting] = useState(false);
    const [sizeConstant, setSizeConstant] = useState((MIN_VAR + MAX_VAR / 2));
    const [displayInch, setDisplayInch] = useState(0);

    const [currentItem, setCurrentItem] = useState('card');
    const [cardSize, setCardSize] = useState(sizeConstant * MULTIPLY_CONSTANT);
    const [usbASize, setusbASize] = useState(sizeConstant * USB_A_CONSTANT);
    const [usbCSize, setusbCSize] = useState(sizeConstant * MULTIPLY_CONSTANT);


    useEffect(() => {
        // Load data from localStorage when component mounts
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            console.log(`Hi${parseFloat(storedData).toFixed(2)}`)
        }
        if (storedData) {
            const parsedData = parseFloat(storedData);
            console.log(storedData)
            if (!isNaN(parsedData)) {
                setCalibrationData(storedData);
                setSizeConstant(parsedData);
                determineDisplaySize(parsedData);

                setCardSize(parsedData * MULTIPLY_CONSTANT);
                setusbASize(parsedData * USB_A_CONSTANT)
                setusbCSize(parsedData * USB_C_CONSTANT)
            }
        }
    }, []);
    

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parseFloat(e.target.value);
        setSizeConstant( parsedValue);
        setCardSize( parsedValue * MULTIPLY_CONSTANT );
        setusbASize( parsedValue * USB_A_CONSTANT );
        setusbCSize( parsedValue * USB_C_CONSTANT );

        determineDisplaySize(parseFloat(e.target.value));

        // Update state
        setCalibrationData(e.target.value);
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, e.target.value);
        console.log(localStorage.getItem(STORAGE_KEY));
    };

    const handleSettingsClick = () => {
        setToggleSetting(!toggleSetting);
    }

    const determineDisplaySize = (value: number) => {
        if (value > 5.075 && value < 5.085) {
            setDisplayInch(15.4);
        } else {
            setDisplayInch(14.0);
        }
    };

    const handleItem = () => {

    }

    let currentImage;
    if (currentItem === 'card') {
        currentImage = (
            <Image
                src="/card.svg"
                alt="Credit Card"
                height={cardSize}
                width={cardSize / 1.5857}
                style={{ objectFit: "contain" }}
            />
        );
    } else if (currentItem === 'usbA') {
        currentImage = (
            <Image
                src="/usbA.svg"
                alt="usb a"
                height={usbASize}
                width={usbASize}
                style={{ objectFit: "contain" }}
            />
        );
    } else if (currentItem === 'usbC') {
        currentImage = (
            <Image
                src="/usbC.svg"
                alt="usb c"
                height={usbCSize}
                width={usbCSize}
                style={{ objectFit: "contain" }}
            />
        );
    }

    return (
        <div className={styles.card_layout}>
            <div className={styles.card_box} style={toggleSetting ? {} : {display: 'none'}}>
                <div className={styles.card}
                style={{ 
                    height: `${cardSize}px`,
                    width: `${cardSize / 1.5857}px` // Maintain aspect ratio
                }}>
                    <div className={styles.item_list}>
                        <Image className={styles.item} onClick={() => setCurrentItem('card')} src="/icon_card.svg" alt="Card Icon" height={32} width={32} />
                        <Image className={styles.item} onClick={() => setCurrentItem('usbA')} src="/icon_usb_a.svg" alt="UsbA Icon" height={32} width={32} />
                        <Image className={styles.item} onClick={() => setCurrentItem('usbC')} src="/icon_usb_c.svg" alt="UsbC Icon" height={32} width={32} />
                    </div>
                    {currentImage}
                </div>
            </div>
            <input 
                style={toggleSetting ? {} : {display: 'none'}}
                className={styles.vertical_slider} 
                type='range'
                min={MIN_VAR}
                max={MAX_VAR}
                step="0.01"
                value={sizeConstant}
                onChange={handleSliderChange}
            ></input>
            <h2 className={styles.computer_size}>
                <span>
                    {`${displayInch} inch`}
                </span>
                <Image
                className={styles.settings_icon} 
                src="/Settings.svg"
                alt="settings"
                height={20}
                width={20}
                onClick={handleSettingsClick}
                />
            </h2>
        </div>        
    )
}