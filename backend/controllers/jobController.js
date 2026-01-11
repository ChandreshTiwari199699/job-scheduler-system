const Job = require("../models/Job");
const axios = require("axios");

const WEBHOOK_URL = process.env.WEBHOOK_URL;

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({ order: [["createdAt", "DESC"]] });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.runJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    job.status = "running";
    await job.save();

    // simulate 3 sec processing
    setTimeout(async () => {
      job.status = "completed";
      await job.save();

      try {
        const response = await axios.post(WEBHOOK_URL, {
          jobId: job.id,
          taskName: job.taskName,
          priority: job.priority,
          payload: job.payload,
          completedAt: new Date(),
        });
        console.log("Webhook sent:", response.data);
      } catch (err) {
        console.log("Webhook error:", err.message);
      }
    }, 3000);

    res.json({ msg: "Job is running" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
