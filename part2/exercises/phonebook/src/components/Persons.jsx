const Persons = ({ persons, deletePerson }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons?.map(person => (
                <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></p>
            ))}
        </div>
    )
}

export default Persons