import React, { useState, useEffect } from 'react';
import { getActivity, updateAgentStatus } from '../services/api';

function SomeComponent() {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await getActivity();
        setActivity(data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    }
    fetchActivity();
  }, []);

  const handleUpdateStatus = async () => {
    try {
      await updateAgentStatus({ status: 'active' });
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <h1>Activity</h1>
      {activity && (
        <pre>{JSON.stringify(activity, null, 2)}</pre>
      )}
      <button onClick={handleUpdateStatus}>Update Status</button>
    </div>
  );
}

export default SomeComponent;
