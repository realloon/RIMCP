import { type DefsTable, db } from '../utils/db'
import { builder } from '../utils/xml-utils'

interface Params {
  $name: string
  $type?: string
}

type ResultRow = Pick<DefsTable, 'defType' | 'payload'>

export function getDefDetails(defName: string, defType?: string): string[] {
  let queryStr = 'SELECT defType, payload FROM defs WHERE defName = $name'
  const params: Params = { $name: defName }

  if (defType) {
    queryStr += ' AND defType = $type'
    params.$type = defType
  }

  const query = db.query<ResultRow, any>(queryStr)
  const rows = query.all(params)

  if (rows.length === 0) return []

  return rows.map(row => {
    const type = row.defType
    const obj = JSON.parse(row.payload)

    delete obj.defType

    return builder.build({ [type]: obj })
  })
}
