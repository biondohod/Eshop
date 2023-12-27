import spinner from './loading.gif';

import './Spinner.scss';
import {FC} from "react";

const Spinner: FC = () => {
    return (
        <div className="spinner__wrapper">
            <img src={spinner} alt="spinner."/>
        </div>
    )
};

export default Spinner;