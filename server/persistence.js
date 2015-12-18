import level from 'level'
import config from './config'

export class Database {
  constructor() {
    // TODO: offer other solutions than LevelDB
    const name = config.get('LEVEL_DB')
    this.db = level(name, {valueEncoding: 'json'})
  }

  static instance() {
    if (!Database.__instance__) {
      Database.__instance__ = new Database()
    }
    return Database.__instance__
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this.db.get(id, (err, value) => {
        if (err && err.notFound) resolve(null)
        else if (err) reject(err)
        else resolve(value)
      })
    })
  }

  put(id, value) {
    return new Promise((resolve, reject) => {
      this.db.put(id, value, (err, v) =>
        err ? reject(err) : resolve(v))
    })
  }

  del(id) {
    return new Promise((resolve, reject) => {
      this.db.del(id, err =>
        err ? reject(err) : resolve())
    })
  }
}