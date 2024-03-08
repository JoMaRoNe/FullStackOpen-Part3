const Person = ({person, handle}) => {
    return (
        <p>{person.name} {person.number}<button onClick={() =>handle(person.name, person.id)}>delete</button></p>
    )
}

export default Person