'use client'
import { useState, ReactNode } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import styles from './Tooltip.module.css';

export function Tooltip({ children }: { children: ReactNode }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={styles.metric_tooltip}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
        <FontAwesomeIcon icon={faCircleQuestion} /><span draggable="false">  cm?</span>
        {isVisible ? (
            <div className={styles.details_tooltip}>
                {children}
            </div>
        ) : null}
      </div>
    );
}