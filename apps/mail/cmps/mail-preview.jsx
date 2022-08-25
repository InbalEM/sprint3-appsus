
const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {

    function getTime(ms) {
        return
    }

    return <React.Fragment>
        <p className="subject">{mail.subject}</p>
        <p>{mail.sentAt}</p>
        {/* <Link to={"/car/" + car.id}>
            <div className="img-container">
                <img src={`../assets/img/${car.vendor}.jpg`} />
            </div>
            </Link> */}



    </React.Fragment>
}








