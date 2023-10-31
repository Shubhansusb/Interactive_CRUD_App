import axios from "axios";

const RecordsList = ({ records, theEditHandler }) => {

    const deleteHandler = async (email) => {
       await axios.delete(`http://localhost:8000/api/Delete?email=${email}`)
    }

    const editHandler = (Email) => {
        theEditHandler(Email);
    }

    return <>
    {records.map(record => (
        <div className="record-container" key={record.email}>
            <h1 className="record-name">{record.name}</h1>
            <button className="action-button delete-button" onClick={() => deleteHandler(record.email)}>Delete Record</button>
            <button className="action-button edit-button" onClick={() => editHandler(record.email)}>Edit Record</button>
        </div>
    ))}
</>
}

export default RecordsList;