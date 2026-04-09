import mongoose from "mongoose"
import dotenv from "dotenv"
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch (error) {
        console.error(`Server error connecting to the DB: `, error.message)
        process.exit(1)
    }
}

export default connectDB