import multer from "multer"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, `product-${crypto.randomUUID()}.${file.originalname.split(".").pop()}`)
    }
})

const upload = multer({ storage: storage })

export default upload