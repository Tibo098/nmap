import mongoose from "mongoose"
import RequestSchema from "./shema.js"


const basyx = mongoose.model("basyx", RequestSchema )

export default basyx