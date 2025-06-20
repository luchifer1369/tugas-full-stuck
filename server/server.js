// 📂 Lokasi: server/server.js

import app from './express.js'
import config from './config/config.js'

const PORT = config.port

app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Server failed to start:', err)
  } else {
    console.info(`✅ Server started on port ${PORT}`)
  }
})
