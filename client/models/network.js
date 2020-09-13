const localStorageKey = 'API_KEY';

function network({ body, ...customConfig } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const url = `/${endpoint}`;

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  console.log(`Sending ${config.method} to ${url} with data:`, body);

  return fetch(url, config).then(async (response) => {
    if (response.status === 401) {
      logout();
      location.assign(location);
      return;
    }
    const data = await response.json();
    if (response.ok) {
      console.log(`Got response ${response.status}`, data);
      return data;
    } else {
      console.error(`${response.status} : '${data.message}'`);
      return Promise.reject(`${response.status} : '${data.message}'`);
    }
  });
}

network.put = (id, options) => network(id, { method: 'PUT', ...options });
network.post = (id, options) => network(id, { method: 'POST', ...options });
network.get = (id, options) => network(id, { method: 'GET', ...options });
network.delete = (id, options) => network(id, { method: 'DELETE', ...options });

function logout() {
  localStorage.removeItem(localStorageKey);
}
