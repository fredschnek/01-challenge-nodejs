import fs from 'node:fs'
import { parse } from 'csv-parse'
import http from 'node:http'

// Helper function to make POST requests to /tasks
const postTask = async (task) => {
  const data = JSON.stringify(task)

  const options = {
    hostname: 'localhost',
    port: 3333,
    path: '/tasks',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = ''
      res.on('data', (chunk) => {
        responseData += chunk
      })
      res.on('end', () => {
        resolve(JSON.parse(responseData))
      })
    })

    req.on('error', (e) => {
      reject(e)
    })

    req.write(data)
    req.end()
  })
}

// Function to import tasks from a CSV file
const importTasksFromCSV = async (filePath) => {
  const parser = fs.createReadStream(filePath).pipe(parse({ columns: true, skip_empty_lines: true }))
  for await (const record of parser) {
    const task = {
      title: record.title,
      description: record.description
    }
    await postTask(task)
  }
}

// Import tasks from CSV file
importTasksFromCSV('path/to/your/tasks.csv').then(() => {
  console.log('Tasks imported successfully')
}).catch((error) => {
  console.error('Error importing tasks:', error)
})