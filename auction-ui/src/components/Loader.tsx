import { Oval } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
      <Oval
        height={80}
        width={80}
        color="#E8F6FF"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#E8F6FF"
        strokeWidth={2}
        strokeWidthSecondary={2}
        wrapperClass="loader"
      />
    </>
  )
}

export default Loader
