import React, {  useRef  } from 'react'

import {productProps} from './interfaces' 


// interface myHTMLInputElement extends Omit<HTMLInputElement, 'value'> {
//     value: string | number 
// }

interface calculatorProps{
    "data": productProps,
    "currentBid": number
}

const CalculatorWidget = ({data, currentBid}: calculatorProps) => {
    const myContainer = useRef<HTMLHeadingElement>(null);
    const myContainer1 = useRef<HTMLHeadingElement>(null);
    const myContainer2 = useRef<HTMLHeadingElement>(null);
    const myContainer3 = useRef<HTMLHeadingElement>(null);

    const myContainer4 = useRef<HTMLInputElement>(null);
    const myContainer5 = useRef<HTMLInputElement>(null);
    const myContainer6 = useRef<HTMLInputElement>(null);
    const myContainer7 = useRef<HTMLInputElement>(null);

    const obj1 = myContainer.current
    const obj2 = myContainer1.current
    const obj3 = myContainer2.current
    const obj4 = myContainer3.current

    window.onload = () => {   
        if (obj1)  calculateRigly()
    };


function formatMoney(number: number) {
    return Number((number).toFixed(2)).toLocaleString();
}


function animateValue(obj: HTMLHeadingElement | null, start: number, end: number, duration: number) {
    let startTimestamp: number | null = null;
    start = parseInt(start.toString().replaceAll(',','')) || 0
    end = Math.round(parseInt(end.toString().replaceAll(',','')))
    const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress: number = Math.min((timestamp - startTimestamp) / (duration), 1);

        if(obj){
            obj.innerHTML = formatMoney(Math.floor(progress * (end - start) + start));
        }

        if (progress < 1) {
        window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function calculateRigly(){

    const objId1 = Math.round(parseFloat(myContainer4.current? myContainer4.current.value.replaceAll(',','') : "0"))
    const objId4 = Math.round(parseFloat(myContainer5.current? myContainer5.current.value.replaceAll(',','') : "0"))
    const objId7 = Math.round(parseFloat(myContainer6.current? myContainer6.current.value.replaceAll(',','') : "0"))
    const objId8 = Math.round(parseFloat(myContainer7.current? myContainer7.current.value.replaceAll(',','') : "0"))
    
    if(obj1){
        const calc1 = (objId1 / objId4 ) / objId7;
        animateValue(obj1, parseInt(obj1.innerText), calc1, 1200);

        animateValue(obj2, parseInt(obj2?obj2.innerText:"1"), objId8, 1200);

        animateValue(obj3, parseInt(obj3?obj3.innerText:"1"), objId1, 1200);

        const calc2 = objId8 * objId4 * objId7
        animateValue(obj4, parseInt(obj4?obj4.innerText:"1"), calc2, 1200);
    }
}

  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
        <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">What's your bid?</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} type="number" defaultValue={currentBid?currentBid:(data?.starting_bid)} className="form-control" ref={myContainer4} id="#1" placeholder="0" /> 
                        <span className="ms-1 text-secondary">Sats</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">What is future hashprice??</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} className="w-100" type="range" defaultValue={data.auction_meta?.current_hash_price} ref={myContainer7} id="#8" name="volume" min="0" max="800" />
                        <span className="ms-1 text-secondary">Sats per TH/s/Day</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Speed</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} type="number" className="form-control" ref={myContainer5} id="#4" defaultValue={data.auction_meta?.hashrate} placeholder="0" /> 
                        <span className="ms-1 text-secondary">TH/s</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Days of Mining</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} type="number" className="form-control" ref={myContainer6} defaultValue={data.auction_meta?.days_of_mining} id="#7" placeholder="0" /> 
                        <span className="ms-1 text-secondary">Days</span>
                    </div>
                </div>
            </div>
            <div className="col-md-6 border rounded-3 calculator-details py-3 px-3">
                <div>
                    <small>Estimate future hashprice (per TH/s/day)</small>
                    <h3 id="formula-result-#9" ref={myContainer1}>{data.auction_meta?.current_hash_price}</h3>
                </div>
                <div>
                    <small>Your mining hashprice (per TH/s/day)</small>
                    <h3 id="formula-result-#10" ref={myContainer}>{Math.round(((currentBid?currentBid:(data.starting_bid?data.starting_bid:1))/parseInt(data.auction_meta.hashrate?data.auction_meta.hashrate:"1"))/parseInt(data.auction_meta.days_of_mining?data.auction_meta.days_of_mining:"1"))}</h3>
                </div>
                <div>
                    <small>Your mining cost ©</small>
                    <h3 id="formula-result-#5" ref={myContainer2}>{Math.round((currentBid?currentBid:(data?.starting_bid)))}</h3>
                </div>
                <div>
                    <small>Estimate future mining payout</small>
                    <h3 id="formula-result-#11" ref={myContainer3}>{parseInt(data.auction_meta.hashrate?data.auction_meta?.hashrate:"1")*parseInt(data.auction_meta.days_of_mining?data.auction_meta?.days_of_mining:"1")*parseInt(data?.auction_meta.current_hash_price?data?.auction_meta.current_hash_price:"1")}</h3>
                </div>
            </div>
            
        </div>
        </section>
  )
}

export default CalculatorWidget