import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title : {
            type: String,
            required: true,
        },
        sections: [
            {
                heading: String,
                content: String,
            },
        ],
        images: {
            type: [String],
            default: [],
        },
        keywords: {
            type: [String],
            default: [],
            required: false,
        },
        createdAt : {
            type: Date,
            default: Date.now,
        },
        updatedAt : {
            type: Date, 
            default: Date.now,
        },
    },
    {timestamps: true}
);

// Delete the model if it exists to ensure fresh schema compilation with keywords field
if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
}

export default mongoose.model("Blog", BlogSchema);