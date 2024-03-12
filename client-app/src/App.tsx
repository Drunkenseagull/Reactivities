import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(res => {
      setActivities(res.data);
    });
  }, []);

  return (
    <>
      <Header as='h2' icon='users' content='Reactivities' />
      <List.Item >
        {activities.map((activity: any) => (
          <li key={activity.id}>
            {activity.title}
          </li>
        ))}
      </List.Item>
    </>
  )
}

export default App
