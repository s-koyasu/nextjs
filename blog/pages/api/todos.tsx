import fs from 'fs'
import { join } from 'path'

export default function handler(req, res) {
    // GET以外のリクエストを許可しない
    if (req.method.toLocaleLowerCase() !== 'get') {
      return res.status(405).end()
    }
    // JSON ファイルを読み込む
    const jsonPath = join(process.cwd(), 'data', 'sample.json')
    const jsonText = fs.readFileSync(jsonPath, 'utf-8')
    const jsonObj = JSON.parse(jsonText)
    res.status(200).json(jsonObj)
}