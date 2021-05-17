const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let html = "<h2>Hello Vue</h2>"
//   从数据库 取数据
res.send(arr)
})

app.get('/test', (req, res) => {
    res.send("访问了 /test接口")
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})