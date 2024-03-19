import { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { act } from 'react-dom/test-utils';

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit, submitting }: Props) { //destructures activity to the local name selectedActivity
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    createOrEdit(activity);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setActivity({...activity, [name]: value})
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} /> {/*calls handelSubmit passing the name of title and current value of the html element as value*/}
        <Form.Input placeholder='Description' value={activity.description} name='description' onChange={handleInputChange}  />
        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
        <Form.Input placeholder='Date' type='date' value={activity.date} name='date' onChange={handleInputChange} />
        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' /> {/*loading checks if the form is currently submitting and displays a loading graphic if so*/}
        <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
      </Form>
    </Segment>
  )
}