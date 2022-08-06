
const Button = (props) => {
    return (
        <button className="btn btn-primary mb-3" onClick={props.onClick}>{props.title}</button>
    )
}

export default Button;