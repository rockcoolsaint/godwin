import React from 'react'

const Pagination = () => {
  return (
    <div className="pager-bx">
        <ul>
            <li>
                <a href="#" className="navar">
                    <i className="far fa-angle-left fa-fw"></i>
                </a>
            </li>

            <li className="active">
                <a href="#">1</a>
            </li>

            <li>
                <a href="#">2</a>
            </li>

            <li>
                <a href="#" className="navar">
                    <i className="far fa-angle-right fa-fw"></i>
                </a>
            </li>
            
        </ul>
    </div>
  )
}

export default Pagination