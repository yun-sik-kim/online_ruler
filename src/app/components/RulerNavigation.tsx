'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faCube } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons'
import styles from "./page.module.css";
import Link from "next/link";



export default function RulerNavigation() {

    return (
        <div id={styles.ruler_nav_layout}>
          <nav>
            <Link className={styles.icon} id={styles.current} href='/'>
              <FontAwesomeIcon icon={faRuler} />
              <h2>ruler</h2>
              <p>straight line, set your length</p>
            </Link>         
            <Link className={styles.icon} href='/rectangle'>
              <FontAwesomeIcon icon={faSquare} />
              <h2>2d box</h2>
              <p>2d rectangle, set your width and height</p>
            </Link>
            <Link className={styles.icon} href='/circle'>
              <FontAwesomeIcon icon={faCircle} />
              <h2>2d circle</h2>
              <p>round circle, set your radius</p>
            </Link>
            <Link className={styles.icon} href=''>
              <FontAwesomeIcon icon={faCube} />
              <h2>3d box (coming soon)</h2>
              <p>3d rectangle. Width, height and length</p>
            </Link>
          </nav>
        </div>
    )
}