'use client'
import { useState, useEffect, ReactNode } from 'react';
import styles from './Calibrator.module.css'
import Image from 'next/image';

const STORAGE_KEY = 'calibrationData';

export default function Calibrator() {
    const CARD_CONSTANT = 28.5;
    const USB_A_CONSTANT = 10;
    const USB_C_CONSTANT = 7.5;

    const MIN_INCH_VAR = 7.9;     // 0.31 = 0.1 inch 
    const MAX_INCH_VAR = 50;      // 0.31 = 0.1 inch 

    const [toggleSetting, setToggleSetting] = useState(false);
    const [displayInch, setDisplayInch] = useState(0);

    const [currentItem, setCurrentItem] = useState('card');
    const [cardSize, setCardSize] = useState(CARD_CONSTANT);
    const [usbASize, setusbASize] = useState(USB_A_CONSTANT);
    const [usbCSize, setusbCSize] = useState(CARD_CONSTANT);

    useEffect(() => {
        // Load data from localStorage when component mounts
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            const parsedData = parseFloat(storedData);
            if (!isNaN(parsedData)) {
                setDisplayInch(parsedData);
                setCardSize(parsedData * CARD_CONSTANT);
                setusbASize(parsedData * USB_A_CONSTANT)
                setusbCSize(parsedData * USB_C_CONSTANT)
                console.log(`initial local storage is: ${localStorage.getItem(STORAGE_KEY)}`);
            }
        }
    }, []);
    

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, e.target.value);

        const parsedValue = parseFloat(e.target.value);
        setDisplayInch(parsedValue);
        setCardSize(parsedValue * CARD_CONSTANT);
        setusbASize(parsedValue * USB_A_CONSTANT);
        setusbCSize(parsedValue * USB_C_CONSTANT);
    };

    const handleSettingsClick = () => {
        setToggleSetting(!toggleSetting);
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
                min={MIN_INCH_VAR}
                max={MAX_INCH_VAR}
                step="0.1"
                value={displayInch}
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