import GridIcon from '../images/gird-ic.svg'
import ListIcon from '../images/list-ic.svg'
import Link from './shared/Link'

const FilterSort = () => {
  return (
    <div className="product-lst-header">
      <div className="row">
        <div className="col-md-5 col-sm-5">
          <div className="lft-acbar">
            <ul>
              <li>
                <Link to="#">
                  <img src={GridIcon} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#">
                  <img src={ListIcon} alt="" />
                </Link>
              </li>
              <li>
                <select className="form-control">
                  <option>Availability</option>
                  <option>Availability</option>
                  <option>Availability</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-7 col-sm-7">
          <div className="lft-acbar right-acbar">
            <ul>
              <li>
                <h6>Showing 1 - 9 of 9 result</h6>
              </li>
              <li>
                <select className="form-control">
                  <option>Default Sorting</option>
                  <option>Low</option>
                  <option>High</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSort
