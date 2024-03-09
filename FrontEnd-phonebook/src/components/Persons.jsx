const Persons = ({persons, search, handle}) => {
    
    const personsToShow = search
    ? persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : persons
    return (
        <div>
            {personsToShow.map(person => 
                <p key={person.id}>
                    {person.name} {person.number}  
                    <button onClick={() =>handle(person.name, person.id)}>
                        delete
                    </button>
                </p>
            )}
        </div>
    )
}

export default Persons