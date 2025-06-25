
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('jwt');
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });
}