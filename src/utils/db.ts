import { Database } from 'bun:sqlite'
import { join } from 'path'

export interface DefsTable {
  defName: string
  defType: string
  label: string | null
  payload: string // JSON
}

const dbPath = join(import.meta.dir, '../../dist/defs.db')

export const db = new Database(dbPath, { readonly: true })
