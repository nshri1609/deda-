import React, { useEffect, useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';
import { DataRequest } from '../types';

const agent = new HttpAgent();
const backend = Actor.createActor(idlFactory, { agent, canisterId: 'YOUR_CANISTER_ID' });

const DataRequestList: React.FC = () => {
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([]);

  useEffect(() => {
    const fetchDataRequests = async () => {
      const requests = await backend.get_data_requests() as unknown as DataRequest[];
      setDataRequests(requests);
    };

    fetchDataRequests();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Data Requests</h2>
      <ul className="list-disc list-inside">
        {dataRequests.map((request) => (
          <li key={request.id}>
            {request.description} - Reward: {request.reward}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataRequestList;