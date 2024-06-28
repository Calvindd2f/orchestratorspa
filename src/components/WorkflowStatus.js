import React, { useState, useEffect } from 'react';
import { fetchWorkflowStatus } from '../services/api';

function WorkflowStatus({ packageId }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        const data = await fetchWorkflowStatus(packageId);
        setStatus(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadStatus();
  }, [packageId]);

  if (!status) {
    return <div>Loading status...</div>;
  }

  return (
    <div>
      <h2>Workflow Status</h2>
      <p>{status}</p>
    </div>
  );
}

export default WorkflowStatus;
