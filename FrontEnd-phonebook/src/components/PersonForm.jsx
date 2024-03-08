const PersonForm = ({add, name, handleP, number, handleN}) => {
    return (
        <form onSubmit={add}>
        <div>
        name: <input 
            value={name}
            onChange={handleP}
        />
        </div>
        <div>
        number: <input
            value={number}
            onChange={handleN}
        />  
        </div>
        <div>
        <button type="submit">add</button>
        </div>
        </form>
    )
}

export default PersonForm