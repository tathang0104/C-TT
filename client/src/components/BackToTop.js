import React, { useEffect, useState } from 'react'
import clsx from 'clsx'



export default function BackToTop() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const isShow = () => {
      if (window.scrollY > 300) {
        handleShow(true);
      } else handleShow(false);
    }
    window.addEventListener('scroll', isShow);
    return () => {
      window.removeEventListener('scroll', isShow);
    };
  }, []);

  const isShowClass = show ? "animate__animated animate__fadeIn" : "animate__animated animate__fadeOut"

  const backToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={clsx("btn btn-lg btn-primary btn-lg-square back-to-top", isShowClass)} onClick={() => backToTop()} ><i className="bi bi-arrow-up"></i></button>
  )
}
