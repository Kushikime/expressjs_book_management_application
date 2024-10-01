require('dotenv').config();
const http = require('http');

http.createServer().listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
