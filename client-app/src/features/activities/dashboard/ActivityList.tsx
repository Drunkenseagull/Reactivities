import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment} from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityList() {
  const [target, setTarget] = useState('');
  const { activityStore } = useStore();
  const { deleteActivity, activitiesByDate, loading} = activityStore;

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) { //e = event
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
                <Item.Extra>
                  <Button onClick={() => activityStore.selectActivity(activity.id)} float='right' content='View' color='blue' />
                  <Button
                    name={activity.id}
                    onClick={(e) => handleActivityDelete(e, activity.id)}
                    loading={loading && target === activity.id}
                    float='right'
                    content='Delete'
                    color='red' />
                  <Label basic content={activity.category} />
                </Item.Extra>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  )
})