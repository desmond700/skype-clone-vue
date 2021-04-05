const HOST = window.location.hostname;
const PROTOCOL = window.location.protocol;
const SERVER_PORT = 8000;
const serverUrl =
  process.env.SERVER_URL || `${PROTOCOL}//${HOST}:${SERVER_PORT}`;

export { serverUrl };
