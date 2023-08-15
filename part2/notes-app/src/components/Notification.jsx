const Notification = ({message}) => {

    if(message === "")
    {
        return null;
    }
    return (
        <div style={{background:"red"}}>
            {message}
        </div>
    )
}

export default Notification;