import './Form.css'
import axios from 'axios'

const Form = ({ editData }) => {

    const createRecord = async (record) => {
        await axios.post('http://localhost:8000/api/create', record)
    }

    const editRecord = async (record) => {
        await axios.patch(`http://localhost:8000/api//partialUpdate?email=${record.email}`, record)
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const newObj = {
            name: event.target.name.value,
            email: event.target.email.value,
            profession: event.target.proffession.value,
        }

        if (!editData) {
            createRecord(newObj);
        } else {
            editRecord(newObj)
        }
    }

    return <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input type="text" name="name" placeholder="Name" defaultValue={editData ? editData.name : ''} />

        <label>email:</label>
        <input type="text" name="email" placeholder="email" defaultValue={editData ? editData.email : ''} />

        <label>Profession:</label>
        <input type="text" name="proffession" placeholder="Profession" defaultValue={editData ? editData.profession : ''} />

        <button type="submit">Submit</button>
    </form>
}

export default Form;