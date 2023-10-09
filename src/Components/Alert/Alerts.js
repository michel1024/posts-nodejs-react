import React from "react";

const Alert = ({bs_class, text, loginErr, setLoginErr}) => {

    const handleClickClose = () => {
        setLoginErr(false);
    }

    return (
        <>
            {loginErr ?
                <div className={`alert ${bs_class} alert-dismissible fade show`} role="alert">
                    <strong>{text}</strong>
                    <button type="button" onClick={handleClickClose} className="btn-close" data-dismiss="alert" aria-label="Close"></button>
                </div> : <div></div>
            }
        </>
    );
}

export default Alert;