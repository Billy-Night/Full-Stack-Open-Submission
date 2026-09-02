import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040 - 1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const personExists = persons.some(
      (e) => e.name.toLocaleLowerCase() === newName.toLocaleLowerCase(),
    );

    if (personExists) {
      alert(`${newName} is already added to the phone book`);
      setNewName("");
      return;
    }

    const perObj = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(perObj));

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
