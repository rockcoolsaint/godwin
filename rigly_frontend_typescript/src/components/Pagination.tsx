import React, { useState } from 'react'
import { Link } from 'react-router-dom'



let getElements: (count: number, limit :number, activePage: number, setQuery: React.Dispatch<string>, setActiveData: React.Dispatch<number>) => 
JSX.Element[] = function (count, limit, activePage, setQuery, setActiveData) {
    let content = [];
    for(let i =1; i <= Math.ceil(count/limit); i++){
        content.push(<li className={i===activePage?"active":""} key={i}><Link to="#" onClick={e => {e.preventDefault();setActiveData(i);i!==activePage?setQuery("?limit="+limit+"&offset="+(limit*(i-1))):console.log('First Page')}}>{i}</Link></li>);
    }
    return content
  }

interface Iprops {
    count: number,
    limit: number,
    next: string,
    prev: string,
    setQuery: React.Dispatch<string>
}

const Pagination = ({count, setQuery, next, prev, limit}:Iprops) => {
  const [activePage, setActiveData] = useState<number>(1);
  return (
    <div className="pager-bx">
        <ul>
        {prev?<li>
            <Link onClick={e => {e.preventDefault();setActiveData(activePage-1);setQuery("?"+prev.split("?")[1])}} to="#" className="navar">
                <i className="far fa-angle-left fa-fw"></i>
            </Link>
        </li>:<></>}

            {prev || next?
                getElements(count, limit, activePage, setQuery, setActiveData)
                :<></>
            }

            {next?<li>
                <Link onClick={e => {e.preventDefault();setActiveData(activePage+1);setQuery("?"+next.split("?")[1])}} to="#" className="navar">
                    <i className="far fa-angle-right fa-fw"></i>
                </Link>
            </li>:<></>}
            
        </ul>
    </div>
  )
}

export default Pagination