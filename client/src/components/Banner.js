import React from 'react'
import { Link } from 'react-router-dom'

export default function Banner(prop) {
  return (
    <div className="container text-center my-5 pt-5 pb-4">
        <h1 className="display-3 text-white mb-3 animated slideInDown text-capitalize">{prop.name}</h1>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                <li className="breadcrumb-item text-white">Pages</li>
                <li className="breadcrumb-item text-white"><Link to={`/${prop.name}`}>{prop.name}</Link></li>
            </ol>
        </nav>
    </div>
  )
}
