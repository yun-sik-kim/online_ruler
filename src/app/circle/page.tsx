import Image from "next/image";
import "./../globals.css";
import { MeasureInput, Tooltip } from "./logics";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRuler, faCube } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons'
import Link from "next/link";

export default function Home() {
  return (
    <div className='main-layout'>
      <div className='ui-layout'>
        <h1>Measure anything, anywhere with our handy online ruler!</h1>
        <MeasureInput className='calculate_box' rulerType='2d_circle'>
          <h3>to inch</h3>
        </MeasureInput>
        <Tooltip className='metric-tooltip'>
          <h3>• cm to mm?</h3>
          <p>1 cm = 10 mm</p>
          <h3>• m to mm?</h3>
          <p>1 m = 100 mm</p>
        </Tooltip>
        <div id='ruler_nav-layout'>
          <nav>
            <Link className="icon" href='/'>
              <FontAwesomeIcon icon={faRuler} />
              <h2>ruler</h2>
              <p>straight line</p>
            </Link>
            <Link className="icon" href='/rectangle'>
              <FontAwesomeIcon icon={faSquare} />
              <h2>2d box</h2>
              <p>2d rectangle, set your width and height</p>
            </Link>
            <Link className="icon" href='/circle'>
              <FontAwesomeIcon icon={faCircle} />
              <h2>2d circle</h2>
              <p>round circle, set your radius</p>
            </Link>
            <Link className="icon" href=''>
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
