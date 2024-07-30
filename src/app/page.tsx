import { UserInput } from "@/app/Model/UserInput";
import { Tooltip } from "@/app/Model/Tooltip";
import Link from "next/link";

import styles from "@/app/CSS/ruler.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faCube } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons'

export default function Home() {
  return (
    <div className='main_layout'>
      <div className={styles.ui_layout}>
        <h1>Measure anything, anywhere with our handy online ruler!</h1>
        <UserInput>
          <h3>to inch</h3>
        </UserInput>
        <Tooltip>
          <h3>• cm to mm?</h3>
          <p>1 cm = 10 mm</p>
          <h3>• m to mm?</h3>
          <p>1 m = 100 mm</p>
        </Tooltip>
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
      </div>
      

      {/* <CalculatorInputLayout /> */}
      {/* <ShowRuler /> */}
    </div>
  );
}
