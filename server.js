import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { upload, dir } from './utils/filemanagement.script.js'

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
if (PORT == 3000)
	console.warn('Failed to locate port from .env file, using 3000 instead.')

app.post('/api/upload', upload.single('avatar'), (req, res, next) => {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log('Upload successful!')

	const response = { ok: true }
	res.json(response)
})

app.get('/', (req, res) => {
	const filePath = path.join(__dirname, dir.public, 'index.html')

	res.sendFile(filePath, (err) => {
		res.send('There was an error with sending index.html file...')
	})
})

app.listen(PORT, () => console.log('Listening on PORT ' + PORT))
