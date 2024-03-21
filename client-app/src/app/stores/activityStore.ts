import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';

export default class ActivityStore {
  // mobx observables
  activitesRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  constructor() {
    makeAutoObservable(this); // makes the variables mobx observables and methods mobx actions
  }

  //mobx computed/derived property
  get activitiesByDate() {
    return Array.from(this.activitesRegistry.values()).sort((a, b) =>
      Date.parse(a.date) - Date.parse(b.date));
  }

  //mobx actions
  loadActivites = async () => {
    this.setLoadingInitial(true);
    try {
      const activities = await agent.activities.list();
      activities.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        runInAction(() => {
          this.setActivity(activity);
        })
      })
      this.setLoadingInitial(false);

    } catch (e) {
      console.log(e);
      this.setLoadingInitial(false);
    }
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    }
    else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (e) {
        console.log(e);
        this.setLoadingInitial(false);
      }
    }
  }

  private getActivity = (id: string) => {
    return this.activitesRegistry.get(id);
  }

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0];
    this.activitesRegistry.set(activity.id, activity);
  }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  }

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.activities.create(activity);
      runInAction(() => {
        this.activitesRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.activities.update(activity);
      runInAction(() => {
        this.activitesRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.loading = false;
      })
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.activities.delete(id);
      runInAction(() => {
        this.activitesRegistry.delete(id);
        this.loading = false;
      });
    } catch (e) {
      console.log(e);
      runInAction(() => {
        this.loading = false;
      });
    }
  }


}