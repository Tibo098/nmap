import mongoose from "mongoose"

const RequestSchema = mongoose.Schema({
 
    cible: {
        type: String,
    },
    option: {
        type: String,
    },
    rest: {
        type: String,
    },
    host: {
        type: String,
    },
    port: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    },
    resul: {
        type: String,
    }
})

export default RequestSchema