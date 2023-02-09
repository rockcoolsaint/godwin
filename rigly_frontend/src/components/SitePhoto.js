import React from 'react'

const SitePhoto = ({data}) => {
  return (
    <section className=" px-4 py-3 rounded-3 border" style={{backgroundColor: '#fff'}}>
        <h5 className="text-start">Site photo</h5>
        <div>
            <img className="w-100" src={data.site_photo} alt="site photo" />
        </div>
    </section>
  )
}

export default SitePhoto