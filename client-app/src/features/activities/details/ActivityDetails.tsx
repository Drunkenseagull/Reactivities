import React from 'react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

  if (!activity) return <LoadingComponent />; // redundant check needed to please typescript

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <CardContent>
        <CardHeader>{activity.title}</CardHeader>
        <CardMeta>
          <span>{activity.date} </span>
        </CardMeta>
        <CardDescription>
          {activity.description}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <Button.Group widths='2'>
          {/*when clicked calls the function defined on app that was passed down through all child component props to select an activity*/}
          <Button onClick={() => openForm(activity.id) } basic color='blue' content='Edit' />
          <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel' />
        </Button.Group>
      </CardContent>
    </Card>
  )
}