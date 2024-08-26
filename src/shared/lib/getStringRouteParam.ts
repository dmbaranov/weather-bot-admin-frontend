export function getStringRouteParam(param: string | string[] | undefined) {
  if (Array.isArray(param)) {
    throw new Error('Expected a string but got an array');
  }
  if (param === undefined) {
    throw new Error('Expected a string but got undefined');
  }
  return param;
}
