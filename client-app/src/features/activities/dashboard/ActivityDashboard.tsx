import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivites, activitesRegistry, loadingInitial } = activityStore;


  // is run every render, if given second arg dependeicies, will only run on initial render and renders when a dependency value has changed
  useEffect(() => {
    if (activitesRegistry.size <= 0 ) loadActivites();
  }, [activitesRegistry.size, loadActivites]);


  if (loadingInitial) return <LoadingComponent content='Loading app...' />



  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
      <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  )
})