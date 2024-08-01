'use client'
import { useState, ReactNode } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import styles from './Tooltip.module.css';

export default function Tooltip({ children, style }: { children: ReactNode, style?: React.CSSProperties }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={styles.metric_tooltip}
            style={style}
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