import error from './error.gif';
import './ErrorMessage.scss';
import '../../pages/Page404/Page404.scss'
import {FC} from "react";
import {Link} from "react-router-dom";

const ErrorMessage: FC = () => {
    const goToPrevPage = () => {
        window.history.back();
    }

    return (
        <div className="error">
            <img src={error} alt="error." className='error__img'/>
            <p className="error__text">
                <span>Oops!</span> Something went wrong, check your internet connection or typos in the link, if that
                still doesn't solve the problem, try again later
            </p>
            <div className="page404__btns">
                <Link to='/'>
                    <button className="button button__main">
                        <div className="inner">Back to main page</div>
                    </button>
                </Link>
                <button onClick={goToPrevPage} className="button button__secondary">
                    <div className="inner">Back to previous page</div>
                </button>
            </div>
        </div>
    )
};

export default ErrorMessage;