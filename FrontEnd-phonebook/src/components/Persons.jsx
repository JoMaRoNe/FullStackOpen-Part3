const Persons = ({persons, search, handle}) => {
    
    const personsToShow = search
    ? persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : persons
    return (
        <div>
            {personsToShow.map(person => 
                <p key={person._id}>
                    {person.name} {person.number}  
                    <button onClick={() =>handle(person.name, person._id)}>
                        delete
                    </button>
                </p>
            )}
        </div>
    )
}

export default Persons