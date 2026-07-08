import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { errorHandler, Status } from './middlewares/errorhandler.js'
import { fileURLToPath } from 'url'
import { upload, dir } from './utils/filemanagement.script.js'
import { logger } from './middlewares/logger.js'

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DEFAULT_PORT = 3000

const PORT = process.env.PORT || DEFAULT_PORT
if (PORT == DEFAULT_PORT)
	console.warn('Failed to locate port from .env file, using 3000 instead.')

app.use(express.static(path.join(import.meta.dirname, dir.public)))
app.use(express.json())
app.use(logger)

app.post('/profile', (req, res) => {
	upload.single('avatar')(req, res, (err) => {
		if (err) {
			res.status(Status.INTERNAL_SERVER_ERROR).send('Error loading page.')
			return
		}

		// Everything went fine.
		console.log('I got the pic!')
		res.status(Status.OK).send('Everything went fine!')
	})
})

app.get('/', (req, res, next) => {
	const filePath = path.join(__dirname, dir.public, 'index.html')

	res.sendFile(filePath, (err) => {
		if (err) {
			res.status(Status.INTERNAL_SERVER_ERROR).send('Error loading page')
			console.log('[ERR]')
		}
	})
})

app.use((req, res) => {
	const filePath = path.join(__dirname, dir.public, '404.html')
	res.status(Status.NOT_FOUND).sendFile(filePath, (err) => {
		if (err) console.log('error sending html files')
	})
	return
})

app.use(errorHandler)
app.listen(PORT, () => console.log('Listening on PORT ' + PORT))
