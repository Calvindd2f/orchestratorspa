import React, { useState } from 'react';
import PackageList from './components/PackageList';
import WorkflowStatus from './components/WorkflowStatus';
import DynamicForm from './components/DynamicForm';
import { fetchFormDefinition } from './services/api';

function App() {
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [formDefinition, setFormDefinition] = useState(null);

  const handleSelectPackage = async (packageId) => {
    setSelectedPackageId(packageId);
    try {
      const formDef = await fetchFormDefinition(packageId);
      setFormDefinition(formDef);
    } catch (error) {
      console.error('Failed to fetch form definition', error);
    }
  };

  return (
    <div className="App">
      <h1>Orchestrator SPA</h1>
      <PackageList onSelectPackage={handleSelectPackage} />
      {selectedPackageId && (
        <>
          <WorkflowStatus packageId={selectedPackageId} />
          {formDefinition && (
            <DynamicForm packageId={selectedPackageId} formDefinition={formDefinition} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
