// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFunction = (func: unknown): func is (...args: any[]) => any => {
  return typeof func === "function";
};
