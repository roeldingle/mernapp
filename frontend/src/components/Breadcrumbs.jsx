import React from 'react'
import {Link} from 'react-router-dom'


function Breadcrumbs(props) {
  return (
    <div className="container mt-4">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb align-items-center">
                <li className="">
                    <h2 className="me-3">{ props.page }
                    </h2>
                </li>
                {
                    props.items.length > 1 ?
                        props.items.map((item,index)=>(
                            index === 0 ? 
                            (<li className="breadcrumb-item" key={index}><button className="btn btn-link" onClick={props.back}>{item}</button></li>) 
                            : (<li className="breadcrumb-item" key={index}>{item}</li>)
                            
                        ))
                    : ''
                }
            </ol>
        </nav>
    </div>
  )
}

export default Breadcrumbs