export const getValueByPath = (
  dictionary: Map<string, unknown>,
  path: string,
) => {
  const pathArray = path.match(/([^[.\]])+/g);
  if (!pathArray) {
    throw new Error(`Not correct argument path: ${path}`);
  }

  const root = pathArray.shift();
  if (!root) {
    throw new Error(`Something went wrong with argument: ${path}`);
  }

  const rootObject = dictionary.get(root);
  if (rootObject === undefined) {
    throw new Error(`There is no saved argument with name ${root}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pathArray.reduce((acc, key) => acc[key], rootObject as any);
};
