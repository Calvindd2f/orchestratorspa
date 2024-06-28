const API_BASE_URL = 'https://your-api-url.com/api';

export async function updateAgentStatus(status) {
  const response = await fetch(`${API_BASE_URL}/Agent/UpdateAgentStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(status),
  });
  if (!response.ok) {
    throw new Error('Failed to update agent status');
  }
}

export async function getActivity() {
  const response = await fetch(`${API_BASE_URL}/Agent/GetActivity`);
  if (!response.ok) {
    throw new Error('Failed to get activity');
  }
  return response.json();
}

export async function notifyAgentActivityLog(log) {
  const response = await fetch(`${API_BASE_URL}/Agent/NotifyAgentActivityLog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(log),
  });
  if (!response.ok) {
    throw new Error('Failed to notify agent activity log');
  }
}

export async function sendLoggedInSessionInfo(info) {
  const response = await fetch(`${API_BASE_URL}/Agent/SendLoggedInSessionInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(info),
  });
  if (!response.ok) {
    throw new Error('Failed to send logged-in session info');
  }
}

export async function notifyAgentFinished(finishInfo) {
  const response = await fetch(`${API_BASE_URL}/Agent/NotifyAgentFinished`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(finishInfo),
  });
  if (!response.ok) {
    throw new Error('Failed to notify agent finished');
  }
}

export async function notifyUninstallActionFromAgentClient(status) {
  const response = await fetch(`${API_BASE_URL}/Agent/NotifyUninstallActionFromAgentClient`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(status),
  });
  if (!response.ok) {
    throw new Error('Failed to notify uninstall action from agent client');
  }
}

export async function getServiceAgentInstallerUrl() {
  const response = await fetch(`${API_BASE_URL}/Agent/GetServiceAgentInstallerUrl`);
  if (!response.ok) {
    throw new Error('Failed to get service agent installer URL');
  }
  return response.json();
}

export async function responseToRetrieveActivityInstances(instances) {
  const response = await fetch(`${API_BASE_URL}/Agent/ResponseToRetrieveActivityInstances`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(instances),
  });
  if (!response.ok) {
    throw new Error('Failed to respond to retrieve activity instances');
  }
}

export async function fetchPackages() {
  const response = await fetch(`${API_BASE_URL}/package`);
  if (!response.ok) {
    throw new Error('Failed to fetch packages');
  }
  return response.json();
}

export async function fetchFormDefinition(packageId) {
  const response = await fetch(`${API_BASE_URL}/form/${packageId}/definition`);
  if (!response.ok) {
    throw new Error('Failed to fetch form definition');
  }
  return response.json();
}


export async function fetchPackageById(id) {
  const response = await fetch(`${API_BASE_URL}/package/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch package');
  }
  return response.json();
}

export async function fetchWorkflowStatus(packageId) {
  const response = await fetch(`${API_BASE_URL}/form/${packageId}/status`);
  if (!response.ok) {
    throw new Error('Failed to fetch workflow status');
  }
  return response.json();
}

export async function submitForm(packageId, formData) {
  const response = await fetch(`${API_BASE_URL}/form/${packageId}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formData }),
  });
  if (!response.ok) {
    throw new Error('Failed to submit form');
  }
}
