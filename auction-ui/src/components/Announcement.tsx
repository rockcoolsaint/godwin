interface Props {
  message: string
}

const Announcement = ({ message }: Props) => {
  return (
    <div className="top-bar">
      <div className="container">
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Announcement
