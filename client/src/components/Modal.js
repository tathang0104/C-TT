import React, { useState} from 'react'
import clsx from 'clsx';

import PropTypes from 'prop-types'

const Modal = props => {
    // eslint-disable-next-line
    const [show, setShow] = useState(props.isShow);
    const children = props.children;
    const title = props.title;

    return (
    <>
        <div style={!show ? {display: "none"} : {display: "block"}} className={clsx("modal animate__animated animate__fadeIn")} role="dialog"  id="videoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true">
        {/* <div className={clsx("modal")} > */}
            <div className="modal-dialog">
                <div className="modal-content rounded-0">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" onClick={() => props.handlerShow()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

Modal.propTypes = {
    children: PropTypes.element,
    handlerShow: PropTypes.func,
    isShow: PropTypes.bool,
    title: PropTypes.string,
}

export default Modal