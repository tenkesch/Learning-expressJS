import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { errorHandler } from './middlewares/errorhandler.js'
import { upload, dir } from './utils/filemanagement.script.js'
import { logger } from './middlewares/logger.js'

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
if (PORT == 3000)
	console.warn('Failed to locate port from .env file, using 3000 instead.')

// app.use(express.static(path.join(import.meta.dirname, dir.public)))
// app.use(express.json())
app.use(logger)

app.post('/profile', (req, res) => {
	upload.single('avatar')(req, res, (err) => {
		if (err) throw new Error(err)
		console.log('I got the pic!')
		res.send('Everything went fine!')
		// err instanceof multer.MulterError
		// 	? console.log('[ERR] Dependency error')
		// 	: console.log('[ERR] Your error nigg')
		// Everything went fine.
	})
})

app.get('/', (req, res) => {
	const filePath = path.join(__dirname, dir.public, 'index.html')

	res.sendFile(filePath, (err) => {
		res.send('There was an error with sending index.html file...')
	})
})

app.use(errorHandler)
app.listen(PORT, () => console.log('Listening on PORT ' + PORT))
