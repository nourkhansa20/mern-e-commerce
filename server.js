import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolving dirnanme for ES module

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 3000

const app = express()

app.use(express.json())
app.use(cookieParser())

// Use the Client app
app.use(express.static(path.join(__dirname, '/client/dist')))

// Render client for any path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})

app.listen(PORT, () => {
    console.log("Server run at port 3000")
})