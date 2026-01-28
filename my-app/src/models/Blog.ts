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
        fontColor: {
            type: String,
            default: '#000000',
            required: false,
        },
        fontStyle: {
            type: String,
            default: 'Arial',
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

// Add indexes for better query performance
BlogSchema.index({ createdAt: -1 }); // Index for sorting by creation date
BlogSchema.index({ title: 'text' }); // Text index for search functionality

// Delete the model if it exists to ensure fresh schema compilation with keywords field
if (mongoose.models.Blog) {
    delete mongoose.models.Blog;
}

export default mongoose.model("Blog", BlogSchema);