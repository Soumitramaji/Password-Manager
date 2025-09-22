const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb')
const bodyparser = require('body-parser')
const cors = require('cors')

dotenv.config()

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'passop'
const app = express()
const port = 3000

app.use(bodyparser.json())
app.use(cors())

// Connect once before starting the server
async function start() {
  try {
    await client.connect()
    console.log('Connected successfully to MongoDB')

    const db = client.db(dbName)
    const collection = db.collection('passwords')

    // Get all passwords
    app.get('/', async (req, res) => {
      try {
        const passwords = await collection.find({}).toArray()
        res.json(passwords)
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch passwords' })
      }
    })

    // Save a password (insert or update)
    app.post('/', async (req, res) => {
      try {
        const password = req.body

        if (password._id) {
          // Update existing password if _id exists
          const id = new ObjectId(password._id)
          delete password._id // Remove _id from update object
          const result = await collection.updateOne({ _id: id }, { $set: password })
          res.json({ success: true, result })
        } else {
          // Insert new password
          const result = await collection.insertOne(password)
          res.json({ success: true, result })
        }
      } catch (err) {
        res.status(500).json({ error: 'Failed to save password' })
      }
    })

    // Delete a password by id
    app.delete('/', async (req, res) => {
      try {
        const { id } = req.body
        if (!id) {
          return res.status(400).json({ error: 'ID is required' })
        }
        const objectId = new ObjectId(id)
        const result = await collection.deleteOne({ _id: objectId })
        res.json({ success: true, result })
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete password' })
      }
    })

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  } catch (err) {
    console.error(err)
  }
}

start()
