// src/utils/log.ts
const isDev = import.meta.env.DEV;

export const log = (...args: any[]) => {
  if (isDev) {
    console.groupCollapsed(...args);
    console.trace();
    console.groupEnd();
  }
};
export const warn = (...args: any[]) => {
  if (isDev) console.warn(...args);
};
export const error = (...args: any[]) => {
  // keep errors in prod (usually)
  console.error(...args);
};
