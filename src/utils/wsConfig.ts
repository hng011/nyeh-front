export const WS_ENDPOINT_KEY = 'nyeh-ws-endpoint-override';

export function getWsEndpoint(): string {
  const raw = localStorage.getItem(WS_ENDPOINT_KEY) || import.meta.env.PUBLIC_WS_ENDPOINT || 'ws://localhost:8080/ws/v1/chat';
  return raw.replace(/\/+$/, '');
}

export function getWsApiKey(): string {
  return import.meta.env.PUBLIC_WS_API_SECRET_KEY || '';
}
