import { getCurrentDateString } from './getCurrentDateString';
import { jotaiStore } from '../main';
import { routineAtom } from '../views/Routine/Routine';

// a singleton to ensure the function doesn't get called more than once
let isLoaded = false;

/**
 * Sets up an event listener to reset the task `checked` state each new day
 *
 * - binds to the `document.visibilitychange` event
 * - resets the `checked` state of all tasks and updates the `dateLastUsed`
 *   field if the previous date doesn't match the current date
 *
 * _NOTE_: only call this function outside of React components
 */
export const bindListener_resetTasksOnVisible = () => {
  if (isLoaded)
    throw new Error(
      "`bindListener_resetTasksOnVisible` has already been called.\n\nThis error may be the consequence of calling the function from within a React component. Don't do that. It can only be called once in the app's lifecycle. :)\n",
    );
  isLoaded = true;

  // bail if we're not in a browser
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // the 'visibilitychange' event is called when coming back to a tab, whether
  // from a minimized window, or switching tabs, or unlocking a mobile device
  document.addEventListener('visibilitychange', () => {
    // only mutate the state if we are _returning_ to the page
    if (document.visibilityState !== 'visible') return;

    const { dateLastUsed } = jotaiStore.get(routineAtom);
    const currentDate = getCurrentDateString();

    // if the previous and current dates match, we shouldn't mutate
    if (dateLastUsed === currentDate) return;

    // mutate the jotai store with a new routine object
    jotaiStore.set(routineAtom, (prevRoutine) => ({
      ...prevRoutine,
      dateLastUsed: currentDate,
      tasks: prevRoutine.tasks.map((task) => ({ ...task, checked: false })),
    }));
  });
};
