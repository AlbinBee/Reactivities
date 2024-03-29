import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react';
import Hello from '../../Components/hello';
import { Container, Header, Icon } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import { Navbar } from '../../Components/nav/Navbar';
import ActivityDashboard from '../../Components/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { Route } from 'react-router-dom';
import HomePage from '../../Components/HomePage';
import Explore from '../../Components/Explore';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  }

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    }).then(() => setSubmitting(false));
  }

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        // console.log(response);
        let activities: IActivity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity);
        })
        setActivities(activities)
      }).then(() => setLoading(false));
  }, []);
  if (loading) {
    return <LoadingComponent content='Loading...' />
  }

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <Route path='/' exact render={() => (
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
            submitting={submitting}
            target={target}
          />
        )} />
      <Route path='/home' component={HomePage} />
      <Route path='/explore' render={() => (
        <Explore activities={activities}/>
      )}/>
      </Container>
      {/* <Icon name="users" />
      <Header as='h2' icon='cart' content='Uptime Guarantee' />
      <Hello /> */}
    </Fragment>
  );
}

export default App;