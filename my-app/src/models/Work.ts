import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        clientName: {
            type: String,
            required: false,
            trim: true,
        },
        projectUrl: {
            type: String,
            required: false,
            trim: true,
            validate: {
                validator: function(v: string) {
                    // If URL is provided, validate it's a valid URL format
                    if (!v) return true; // Optional field
                    try {
                        new URL(v);
                        return true;
                    } catch {
                        return false;
                    }
                },
                message: "Please provide a valid URL",
            },
        },
        images: {
            type: [String],
            default: [],
        },
        keywords: {
            type: [String],
            default: [],
            required: false,
        },
        featured: {
            type: Boolean,
            default: false,
            required: false,
        },
        sections: [
            {
                heading: {
                    type: String,
                    required: false,
                    trim: true,
                },
                content: {
                    type: String,
                    required: false,
                    trim: true,
                },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Add indexes for better query performance
WorkSchema.index({ createdAt: -1 }); // Index for sorting by creation date
WorkSchema.index({ title: 'text' }); // Text index for search functionality
WorkSchema.index({ featured: 1 }); // Index for filtering featured works

// Delete the model if it exists to ensure fresh schema compilation with keywords field
if (mongoose.models.Work) {
    delete mongoose.models.Work;
}

export default mongoose.model("Work", WorkSchema);
