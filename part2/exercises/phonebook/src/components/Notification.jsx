const Notification = ({ message }) => {
    console.log(message)
    if (message === null) return null

    return (
        <div className="message">{message}</div>
    )
}

export default Notification