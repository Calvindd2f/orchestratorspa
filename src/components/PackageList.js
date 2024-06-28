import React, { useState, useEffect } from 'react';
import { fetchPackages } from '../services/api';

function PackageList({ onSelectPackage }) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await fetchPackages();
        setPackages(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadPackages();
  }, []);

  return (
    <div>
      <h2>Packages</h2>
      <ul>
        {packages.map(pkg => (
          <li key={pkg.id} onClick={() => onSelectPackage(pkg.id)}>
            {pkg.packageName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PackageList;
