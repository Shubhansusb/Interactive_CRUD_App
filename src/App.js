import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import RecordsList from './Components/RecordList';
import Form from './Components/Form'

function App() {
  const [records, setRecords] = useState();
  const [editData, setEditData] = useState();
  const [showRecords, setShowRecords] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/allUsers');
        console.log(response)
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);//i do not want to re render it again and again, like after submitting a new new record.
         //on removing the dependency array, it is redering the records without toggling
  


  const toggleHandler = () => {
    setShowRecords(prevRecords => !prevRecords);
  }

  const theEditHandler = (email) => {
    const formData = records.find(record => record.email === email);
    setEditData(formData);
  }

  return (
    <div className="App">
      <button onClick={toggleHandler}>Toggle Records</button>
      {showRecords ? <RecordsList records={records} theEditHandler={theEditHandler} /> : null}    
      <Form editData={editData} /> 
    </div>
  );
}

export default App;
