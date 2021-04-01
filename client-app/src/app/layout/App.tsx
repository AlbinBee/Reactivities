import React, { useState, useEffect, Fragment } from 'react';
import Hello from '../../Components/hello';
import axios from 'axios';
import { Container, Header, Icon } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import { Navbar } from '../../Components/nav/Navbar';
import ActivityDashboard from '../../Components/activities/dashboard/ActivityDashboard';


const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  useEffect(() => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        // console.log(response);
        let activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity);
        });
        setActivities(activities)
      });
  }, []);

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }
  
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }
  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity])
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([ ...activities.filter(a => a.id !== id)]);
  }
  
  

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm}/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={handleCreateActivity}
          editActivity={handleEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
      <Icon name="users" />
      <Header as='h2' icon='cart' content='Uptime Guarantee' />
      <Hello />
    </Fragment>
  );
}

export default App;
