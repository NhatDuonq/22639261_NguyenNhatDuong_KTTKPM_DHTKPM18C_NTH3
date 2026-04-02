const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Ứng dụng Node.js đã chạy thành công trong Docker.');
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});