import React from 'react'

const CalculatorWidget = ({data}) => {

    var obj1 = document.getElementById('formula-result-#10')
    var obj2 = document.getElementById('formula-result-#9')
    var obj3 = document.getElementById('formula-result-#5')
    var obj4 = document.getElementById('formula-result-#11')

    function formatMoney(number) {
        return Number((number).toFixed(2)).toLocaleString();
    }
  

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        start = parseInt(start.toString().replaceAll(',','')) || 0
        end = Math.round(end.toString().replaceAll(',',''))
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            obj.innerHTML = formatMoney(Math.floor(progress * (end - start) + start));

            if (progress < 1) {
            window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function calculateRigly(){

        var objId1 = Math.round(document.getElementById('#1').value.replaceAll(',',''))
        var objId4 = Math.round(document.getElementById('#4').value.replaceAll(',',''))
        var objId7 = Math.round(document.getElementById('#7').value.replaceAll(',',''))
        var objId8 = Math.round(document.getElementById('#8').value.replaceAll(',',''))
        
        var calc1 = (objId1 / objId4 ) / objId7;
        animateValue(obj1, obj1.innerText, calc1, 1200);
    
        animateValue(obj2, obj2.innerText, objId8, 1200);
    
        animateValue(obj3, obj3.innerText, objId1, 1200);
    
        var calc2 = objId8 * objId4 * objId7
        animateValue(obj4, obj4.innerText, calc2, 1200);
    }

  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
        <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">What's your bid?</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} type="number" className="form-control" id="#1" placeholder="0" /> 
                        <span className="ms-1 text-secondary">Sats</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">What is future hashprice??</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} className="w-100" type="range" defaultValue={data.current_hash_price} id="#8" name="volume" min="0" max="800" />
                        <span className="ms-1 text-secondary">Sats per TH/s/Day</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Speed</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} type="number" className="form-control" id="#4" defaultValue={data.hashrate} placeholder="0" /> 
                        <span className="ms-1 text-secondary">TH/s</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Days of Mining</label>
                    <div className="d-flex align-items-center">
                        <input onChange={(e)=>{calculateRigly()}} type="number" className="form-control" defaultValue={data.days_of_mining} id="#7" placeholder="0" /> 
                        <span className="ms-1 text-secondary">Days</span>
                    </div>
                </div>
            </div>
            <div className="col-md-6 border rounded-3 calculator-details py-3 px-3">
                <div>
                    <small>Estimate future hashprice (per TH/s/day)</small>
                    <h3 id="formula-result-#9">$1,20,597</h3>
                </div>
                <div>
                    <small>Your mining hashprice (per TH/s/day)</small>
                    <h3 id="formula-result-#10">$1,20,597</h3>
                </div>
                <div>
                    <small>Your mining cost ©</small>
                    <h3 id="formula-result-#5">$1,20,597</h3>
                </div>
                <div>
                    <small>Estimate future mining payout</small>
                    <h3 id="formula-result-#11">1,470,000</h3>
                </div>
            </div>
            
        </div>
        </section>
  )
}

export default CalculatorWidget