import {useState} from 'react';
import axios from 'axios'
import { prependListener } from 'process';

// App-komponentti on sovelluksen pääkomponentti
function App() {
    const [persons,setPersons] = useState([])

    const [newName,setNewName] = useState[""]

    // Kun henkilön lisays lomake lähetetään
    const addPerson = (event) => {
        event.preventDefault()

        if (persons.some(person => person.name === newName))
        setPersons([...persons, {name:newName}])
    }

    // Kun newName syotekentän arvo muuttuu

    const handleNameChange = (event) =>  {
        setNewName(event.target.value)
    }

    console.log(process.env.PUBLIC_URL)
    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <form >
                
            </form>
        </div>
    )
}
