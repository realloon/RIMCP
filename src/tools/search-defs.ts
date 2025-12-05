import { db } from '../utils/db'

interface DefSearchResult {
  defName: string
  defType: string
  label: string | null
}

export function searchDefs(
  query: string,
  defType?: string,
  limit: number = 20
): { results: DefSearchResult[]; total: number } {
  let whereClause = '(defName LIKE $q OR label LIKE $q)'
  const params: any = { $q: `%${query}%` }

  if (defType) {
    whereClause += ' AND defType = $type'
    params.$type = defType
  }

  const countSql = `SELECT COUNT(*) as count FROM defs WHERE ${whereClause}`
  const countRow = db.query(countSql).get(params) as { count: number }
  const total = countRow?.count ?? 0

  if (total === 0) {
    return { results: [], total: 0 }
  }

  const dataSql = `
    SELECT defName, defType, label 
    FROM defs 
    WHERE ${whereClause}
    LIMIT $limit
  `
  const results = db
    .query(dataSql)
    .all({ ...params, $limit: limit }) as DefSearchResult[]

  return { results, total }
}
