import { useEffect, useState } from 'react';
import api from '../utils/api';
import Link from 'next/link';


export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const fetchJobs = async () => {
    const res = await api.get('/jobs');
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const runJob = async (id) => {
    await api.post(`/run-job/${id}`);
    fetchJobs(); // refresh
  };

  const filteredJobs = jobs.filter(job => {
    return (statusFilter ? job.status === statusFilter : true) &&
           (priorityFilter ? job.priority === priorityFilter : true);
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <select onChange={e => setStatusFilter(e.target.value)} className="border p-2">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
        </select>
        <select onChange={e => setPriorityFilter(e.target.value)} className="border p-2">
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <Link href="/new" className="bg-green-500 text-white px-4 py-2 rounded">Create Job</Link>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="border">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Task Name</th>
            <th className="border px-2 py-1">Priority</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map(job => (
            <tr key={job.id} className="border">
              <td className="border px-2 py-1">{job.id}</td>
              <td className="border px-2 py-1">{job.taskName}</td>
              <td className="border px-2 py-1">{job.priority}</td>
              <td className="border px-2 py-1">{job.status}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  onClick={() => runJob(job.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  disabled={job.status === 'running' || job.status === 'completed'}
                >Run Job</button>
                <Link href={`/jobs/${job.id}`} className="bg-gray-500 text-white px-2 py-1 rounded">View</Link>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
