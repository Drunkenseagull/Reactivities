import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void; // declares as a function singnature for ts
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity, submitting}: Props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode &&
          <ActivityDetails
          activity={selectedActivity}
          cancelSelectActivity={cancelSelectActivity}
          openForm={openForm}
          />}
        {editMode &&
          <ActivityForm activity={selectedActivity} closeForm={closeForm} createOrEdit={createOrEdit} submitting={submitting} />}
      </Grid.Column>
    </Grid>
  )
}