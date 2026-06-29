import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
if (PORT == 3000)
	console.log('Failed to locate port from .env file, using 3000 instead.')

app.get('/', (req, res) => {
	const fileName = 'index.html'
	res.sendFile(fileName, (err) => {
		err
			? console.log('Error happened!')
			: console.log(`Path sent: ${fileName}`)
	})
	// res.send('Hello world!')
})

app.listen(PORT, () => console.log(`Listening on PORT [${PORT}]`))
