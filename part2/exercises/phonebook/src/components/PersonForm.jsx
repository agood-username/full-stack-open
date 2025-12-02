const PersonForm = ({name, onNameChange, number, onNumberChange, addPerson}) => {
    return (
        <>
            <h2>Add new phonebook entry</h2>
            <form>
                <div>
                    name: <input value={name} onChange={onNameChange}/>
                </div>
                <div>
                    number: <input value={number} onChange={onNumberChange} />
                </div>
                <div>
                    <button type="submit" onClick={addPerson}>add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm