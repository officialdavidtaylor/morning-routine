import { atomWithStorage } from 'jotai/utils';
import { getCurrentDateString } from '../../utils/getCurrentDateString';
import { useAtom } from 'jotai';
import { useRerenderOnVisibile } from '../../hooks/useRerenderOnVisible';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { TaskInstanace } from './schema';

/**
 * Jotai atom that manages `routine` state, with persistance to localStorage
 */
const routineAtom = atomWithStorage(
  'routine',
  { version: '1.0', dateLastUsed: '1970-01-01', tasks: [] as TaskInstanace[] },
  undefined,
  { getOnInit: true },
);

/**
 * Displays the set of tasks, allows the user to check/uncheck the tasks, and
 * make edits to the task list.
 */
export const Routine = () => {
  // force the component to rerender when the user re-opens or re-focuses the page
  useRerenderOnVisibile();

  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useAtom(routineAtom);

  const dateString = getCurrentDateString();

  /**
   * The list needs to be reset each new day, so we need to conditionally:
   * - reset the `checked` status of all tasks
   * - update the `dateLastUsed` to the current date
   */
  if (items.dateLastUsed !== dateString) {
    const newRoutine = {
      version: '1.0' as const,
      dateLastUsed: dateString,
      tasks: items.tasks.map((task) => {
        return {
          ...task,
          checked: false,
        };
      }),
    };
    setItems(newRoutine);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h1 className="text-4xl font-semibold">Good morning 🌞</h1>
      <fieldset className="flex flex-col gap-2 pt-4">
        {/*
         * TODO: At present there isn't an intuitive "starting" point.
         *       If the user hasn't configured any tasks yet they need to
         *       tap the `edit` button before they can add something.
         *       UX should be improved
         */}
        {editMode ? (
          <>
            {items.tasks.map(({ id, title }, index) => (
              <div key={id} className="flex items-center gap-2 text-2xl">
                <label htmlFor={`cb-${id}`} className="sr-only">
                  edit field for "{title}"
                </label>
                <button
                  onClick={() => {
                    const newTasks = Array.from(items.tasks);
                    newTasks.splice(index, 1);
                    setItems({ ...items, tasks: newTasks });
                  }}
                  aria-label="delete task"
                >
                  ❌
                </button>
                <input
                  id={`cb-${id}`}
                  defaultValue={title}
                  type="text"
                  onChange={(e) => {
                    const newTasks = Array.from(items.tasks);
                    newTasks[index] = {
                      ...newTasks[index],
                      title: e.target.value,
                    };
                    setItems({ ...items, tasks: newTasks });
                  }}
                  className="rounded-md border-2 border-gray-900 py-0 text-lg"
                />
                {/*
                 * TODO: The up/down arrows are functional, but feel clunky.
                 *       The goal is to replace with DnD.
                 */}
                <button
                  disabled={index === 0}
                  onClick={() => {
                    const newTasks = Array.from(items.tasks);
                    const currentElement = newTasks[index];
                    const swapElement = newTasks[index - 1];
                    newTasks[index] = swapElement;
                    newTasks[index - 1] = currentElement;
                    setItems({ ...items, tasks: newTasks });
                  }}
                  className="disabled:opacity-40"
                  aria-label="move task up one"
                >
                  ⬆️
                </button>
                <button
                  disabled={index === items.tasks.length - 1}
                  onClick={() => {
                    const newTasks = Array.from(items.tasks);
                    const currentElement = newTasks[index];
                    const swapElement = newTasks[index + 1];
                    newTasks[index] = swapElement;
                    newTasks[index + 1] = currentElement;
                    setItems({ ...items, tasks: newTasks });
                  }}
                  className="disabled:opacity-40"
                  aria-label="move task down one"
                >
                  ⬇️
                </button>
              </div>
            ))}
            <div className="text-2xl">
              <button
                onClick={() => {
                  const newTasks = Array.from(items.tasks);
                  newTasks.push({
                    checked: false,
                    id: uuidv4(),
                    title: '',
                  });
                  setItems({ ...items, tasks: newTasks });
                }}
                aria-label="add new task"
                className="flex w-full items-center gap-2"
              >
                <span>➕</span>
                <span className="self-center text-lg text-gray-400">
                  new item
                </span>
              </button>
            </div>
          </>
        ) : (
          items.tasks.map(({ id, title, checked }, index) => (
            <div key={id} className="flex items-center gap-4 text-2xl">
              <input
                id={`cb-${id}`}
                type="checkbox"
                checked={checked}
                onChange={() => {
                  const newTasks = Array.from(items.tasks);
                  newTasks[index].checked = !newTasks[index].checked;
                  setItems({ ...items, tasks: newTasks });
                }}
                className="peer form-checkbox h-6 w-6 rounded-md border-2 checked:bg-black checked:focus:bg-black"
              />
              <label
                htmlFor={`cb-${id}`}
                className="peer-checked:text-gray-400 peer-checked:line-through"
              >
                {title}
              </label>
            </div>
          ))
        )}
      </fieldset>
      <div className="fixed bottom-4 left-0 right-0 flex w-full justify-center">
      <button
        onClick={() => setEditMode((m) => !m)}
          className="rounded-xl border-2 border-gray-200 bg-white px-2 text-gray-600"
      >
        {editMode ? 'save' : 'edit'}
      </button>
      </div>
    </div>
  );
};
