import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { loadActivites, activitesRegistry, loadingInitial } = activityStore;


  // is run every render, if given second arg dependeicies, will only run on initial render and renders when a dependency value has changed
  useEffect(() => {
    if (activitesRegistry.size <= 0 ) loadActivites();
  }, [activitesRegistry.size, loadActivites]);


  if (loadingInitial) return <LoadingComponent content='Loading activities...' />



  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
      <ActivityFilters />
      </Grid.Column>
    </Grid>
  )
})