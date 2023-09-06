const Notification = ({ message }) => {

    // if(message === "")
    // {
    //     return null;
    // }
    // return (
    //     <div style={{background:"red"}}>
    //         {message}
    //     </div>
    // )

    return message ? 
        <div className="error">
            { message }
        </div> : null;
}

export default Notification;