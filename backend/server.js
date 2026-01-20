const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// สร้าง logs directory ถ้ายังไม่มี
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// API demo
app.get('/api/demo', (req, res) => {
  const log = `Access ${new Date().toISOString()} - ${req.ip}\n`;
  fs.appendFileSync(path.join(logsDir, 'access.log'), log);

  res.json({
    git: 'Git branch workflow',
    docker: 'Docker & Docker Compose'
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
