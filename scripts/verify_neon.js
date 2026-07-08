const { Client } = require('@neondatabase/serverless')
require('dotenv').config()

;(async () => {
	try {
		const client = new Client({ connectionString: process.env.DATABASE_URL })
		await client.connect()
		const res = await client.query('SELECT 1 as ok')
		console.log('Query result:', res.rows)
		await client.end()
		process.exit(0)
	} catch (err) {
		console.error('Connection failed:', err.message || err)
		process.exit(2)
	}
})()
