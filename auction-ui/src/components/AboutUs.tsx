import parse from 'html-react-parser'

interface props {
  about_us_1_image: string
  about_us_1_title: string
  about_us_1_sub_title: string
  about_us_1_url: string

  about_us_2_image: string
  about_us_2_title: string
  about_us_2_sub_title: string
  about_us_2_url: string

  about_us_3_image: string
  about_us_3_title: string
  about_us_3_sub_title: string
  about_us_3_url: string
}

interface dataProp {
  data: props
}
const AboutUs = ({ data }: dataProp) => {
  return (
    <section className="about-wrp">
      <div className="container">
        <h2>About Us</h2>

        <div className="abt-row">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="abt-box">
                <img src={data?.about_us_1_image} alt="" />
                <h3>{data?.about_us_1_title}</h3>
                {parse(data?.about_us_1_sub_title.toString())}

                <a href={data?.about_us_1_url}>
                  Read More <i className="far fa-arrow-right fa-fw"></i>
                </a>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="abt-box">
                <img src={data?.about_us_2_image} alt="" />
                <h3>{data?.about_us_2_title}</h3>
                {parse(data?.about_us_2_sub_title.toString())}
                <a href={data?.about_us_2_url}>
                  Read More <i className="far fa-arrow-right fa-fw"></i>
                </a>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="abt-box">
                <img src={data?.about_us_3_image} alt="" />
                <h3>{data?.about_us_3_title}</h3>
                {parse(data?.about_us_3_sub_title.toString())}
                <a href={data?.about_us_3_url}>
                  Read More <i className="far fa-arrow-right fa-fw"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
