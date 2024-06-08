import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

const validateTaskFields = (req, res) => {
  const { title, description } = req.body
  if (!title || !description) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Title and description are required.' }))
    return false
  }
  return true
}

const validateTaskId = (req, res) => {
  const { id } = req.params
  const task = database.select('tasks', { id })[0]
  if (!task) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Task not found.' }))
    return false
  }
  return true
}

export const routes = [
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      if (!validateTaskFields(req, res)) return

      const { title, description } = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      database.insert('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select('tasks', search ? {
        title: search,
        description: search
      } : null)
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      if (!validateTaskFields(req, res)) return
      if (!validateTaskId(req, res)) return

      const { id } = req.params
      const { title, description } = req.body
      database.update('tasks', id, { title, description, updated_at: new Date().toISOString() })
      return res.end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      if (!validateTaskId(req, res)) return

      const { id } = req.params
      database.delete('tasks', id)
      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      if (!validateTaskId(req, res)) return

      const { id } = req.params
      const task = database.select('tasks', { id })[0]
      const completed_at = task.completed_at ? null : new Date().toISOString()
      database.update('tasks', id, { completed_at, updated_at: new Date().toISOString() })
      return res.end()
    }
  }
]