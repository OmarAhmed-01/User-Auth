const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
  console.log(req.body);
  res.json({status: "ok"});
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})