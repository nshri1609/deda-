import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/deda_backend';

const agent = new HttpAgent();
const backend = Actor.createActor(idlFactory, { agent, canisterId: 'YOUR_CANISTER_ID' });

const VerifyData: React.FC = () => {
  const [submissionId, setSubmissionId] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const verifyData = async () => {
    try {
      await backend.verify_data(Number(submissionId));
      setResponse('Data verified successfully');
    } catch (error) {
      setResponse('Error verifying data');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Verify Data</h2>
      <input
        type="number"
        placeholder="Submission ID"
        value={submissionId}
        onChange={(e) => setSubmissionId(e.target.value)}
        className="p-2 border rounded mb-2"
      />
      <button onClick={verifyData} className="px-4 py-2 bg-yellow-500 text-white rounded">
        Verify
      </button>
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default VerifyData;