import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3000
if (PORT == 3000)
	console.warn('Failed to locate port from .env file, using 3000 instead.')

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/tmp/my-uploads')
	},
	filename: function (req, file, cb) {
		// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		// cb(null, file.fieldname + '-' + uniqueSuffix)
		cb(null, file.originalname)
	},
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('avatar'), (req, res, next) => {
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
	console.log('Upload successful!')
	res.json(req.file)
})

app.get('/', (req, res) => {
	const filePath = path.join(__dirname, 'index.html')

	res.sendFile(filePath, (err) => {
		if (err) res.send('There was an error with sending index.html file...')
	})
})

app.listen(PORT, () => console.log('Listening on PORT ' + PORT))
