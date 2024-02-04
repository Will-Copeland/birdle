export function parseURLQueryParams(objectString: string) {
  var searchParams = new URLSearchParams(objectString);
  return Object.fromEntries([...searchParams]);
}

export function serializeURLQueryParams(object: object) {
  return new URLSearchParams(object as Record<string, string>).toString();
}
