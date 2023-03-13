import Image from 'next/image'
import parse from 'html-react-parser'

interface props {
  mining_info_image_1: string
  mining_info_title_1: string
  mining_info_description_1: string
  mining_info_url_1: string

  mining_info_image_2: string
  mining_info_title_2: string
  mining_info_description_2: string
  mining_info_url_2: string

  mining_info_image_3: string
  mining_info_title_3: string
  mining_info_description_3: string
  mining_info_url_3: string
}

interface dataProp {
  data: props
}

const Information = ({ data }: dataProp) => {
  return (
    <section className="mini-hands-wrp">
      <div className="container">
        <h2>
          Mining Back in the
          <br /> Hands of ther Users
        </h2>

        <div className="mining-row">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mining-img">
                <Image src={data.mining_info_image_1} alt="" />
              </div>
            </div>
            <div className="offset-md-1 col-md-5 col-sm-12">
              <div className="mining-data">
                <h3>{data.mining_info_title_1}</h3>
                {parse(data.mining_info_description_1.toString())}
                <a href={data.mining_info_url_1}>
                  Learn more <i className="far fa-arrow-right fa-fw"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mining-row">
          <div className="row">
            <div className="col-md-5 col-sm-12" id="one">
              <div className="mining-data">
                <h3>{data.mining_info_title_2}</h3>
                {parse(data.mining_info_description_2.toString())}
                <a href={data.mining_info_url_2}>
                  Learn more <i className="far fa-arrow-right fa-fw"></i>
                </a>
              </div>
            </div>
            <div className="offset-md-1 col-md-6 col-sm-12" id="two">
              <div className="mining-img">
                <Image src={data.mining_info_image_2} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="mining-row">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mining-img">
                <Image src={data.mining_info_image_2} alt="" />
              </div>
            </div>
            <div className="offset-md-1 col-md-5 col-sm-12">
              <div className="mining-data">
                <h3>{data.mining_info_title_3}</h3>
                {parse(data.mining_info_description_3.toString())}
                <a href={data.mining_info_url_3}>
                  Learn more <i className="far fa-arrow-right fa-fw"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Information
