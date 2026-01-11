import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);

  const fetchJob = async () => {
    if (!id) return;
    const res = await api.get(`/jobs/${id}`);
    setJob(res.data);
  };

  useEffect(() => { fetchJob(); }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Details</h1>
      <p><strong>ID:</strong> {job.id}</p>
      <p><strong>Task Name:</strong> {job.taskName}</p>
      <p><strong>Priority:</strong> {job.priority}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <p><strong>Created At:</strong> {new Date(job.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(job.updatedAt).toLocaleString()}</p>
      <p className="mt-4 font-bold">Payload:</p>
      <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(job.payload, null, 2)}</pre>
    </div>
  );
}
