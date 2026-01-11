import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';

export default function NewJob() {
  const router = useRouter();
  const [taskName, setTaskName] = useState('');
  const [payload, setPayload] = useState('{}');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', { taskName, payload: JSON.parse(payload), priority });
      alert('Job created!');
      router.push('/');
    } catch (err) {
      alert('Error creating job: ' + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Task Name</label>
          <input
            type="text"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            className="border w-full p-2"
            required
          />
        </div>
        <div>
          <label>Payload (JSON)</label>
          <textarea
            value={payload}
            onChange={e => setPayload(e.target.value)}
            className="border w-full p-2"
            rows={5}
          />
        </div>
        <div>
          <label>Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} className="border w-full p-2">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Job</button>
      </form>
    </div>
  );
}
