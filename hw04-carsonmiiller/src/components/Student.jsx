function Interest(props){
     return <div>
        <li>{props.interest}</li>
     </div>
}

const Student = (props) => {
    let from = props.fromWisconsin ? <p>{props.name.first} is from Wisconsin</p> : <p>{props.name.first} is <strong>not</strong> from Wisconsin</p>
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <h4>Major: {props.major}</h4>
	    <p>Credits: {props.numCredits}</p>
        {from}
        <p>{props.name.first} has {props.interests.length} interests including...</p>
        <ul>
            {
                props.interests.map(int => <Interest key={int} interest={int}></Interest>)
            }
        </ul>
    </div>
}

export default Student;