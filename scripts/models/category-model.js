import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    id: {type: String, required: false}, 
    title: {type: String, require: true}
})

export default mongoose.model('category', categorySchema)