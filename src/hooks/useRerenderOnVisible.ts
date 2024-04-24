import { useState } from 'react';

/**
 * This hook returns an integer that is incremented every time the document
 * visbility value changes to 'visible'.
 *
 * In my testing thus far, this triggers re-renders when the user reopens
 * the page, whether by reopening the browser, "unlocking" an iOS device
 * (tested with Safari), or switching between tabs.
 */
export const useRerenderOnVisibile = () => {
  if (typeof window === 'undefined') return;
  if (typeof document === 'undefined') return;

  const [_, setState] = useState(0);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      setState((state) => state + 1);
    }
  });
};
