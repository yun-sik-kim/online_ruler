'use client'
import { useState, ReactNode } from "react";

import styles from '@/app/CSS/ruler.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

export function Tooltip({ children }: {children: ReactNode}) {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    return (
      <div className={styles.metric_tooltip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <FontAwesomeIcon icon={faCircleQuestion} />
        <span draggable="false">  cm?</span>
        <div 
            className={styles.details_tooltip}
            style={{visibility: isVisible ? 'visible' : 'hidden'}}
        >
          {children}
        </div>
      </div>
    );
}