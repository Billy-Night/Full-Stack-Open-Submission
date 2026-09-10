import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      Filter shown with:
      <input value={filter} onChange={onFilterChange} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  name,
  onNameChange,
  number,
  onNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={onNumberChange} />
        </div>
        <div>
          <button type="Submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>
            {person.name} {person.number}
          </p>
          <button
            onClick={() => {
              handleDeletePerson(person.id, person.name);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error(error);
        alert("There was an issue fetching the contacts");
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const foundPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase(),
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added, would you like to change the number`,
        )
      ) {
        personService
          .modifyPerson(existingPerson.id, newContact)
          .then((returnedPerson) => {
            setPersons((currentPer) =>
              currentPer.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person,
              ),
            );
            setNotification({
              success: true,
              message: `Great! ${existingPerson.name} number was changed`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            console.error(error);
            alert("There was an issue updating the person's number");
          });
      } else {
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    personService
      .create(newContact)
      .then((returnedPerson) => {
        setPersons((currentPer) => currentPer.concat(returnedPerson));
        setNotification({
          success: true,
          message: `Nice! ${returnedPerson.name} has been added`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.error(error);
        alert("There was a issue adding the contact");
      });
  };

  const handleDeletePerson = (personId, name) => {
    if (window.confirm(`Are you sure you would like to delete: ${name}`)) {
      personService
        .deletePerson(personId)
        .then(() => {
          setPersons((currentPer) =>
            currentPer.filter((p) => p.id !== personId),
          );
          setNotification({
            success: true,
            message: `${name} was deleted`,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        })
        .catch(() => {
          setNotification({
            success: false,
            message: `${name} was already removed from the server`,
          });
          setTimeout(() => {
            console.log("In timeout for catch on promise");
            setNotification(null);
          }, 5000);
          setPersons((currentPer) =>
            currentPer.filter((p) => p.id !== personId),
          );
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      {notification ? <Notification notification={notification} /> : ""}
      {/* <Notification notification={notification} /> */}
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h2>Add a new contact</h2>
      <PersonForm
        onSubmit={handleFormSubmit}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={foundPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
