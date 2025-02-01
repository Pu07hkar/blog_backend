import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    auther:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps:true
})

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;