import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(v: string) {
                    // Basic email validation
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: "Please provide a valid email address",
            },
        },
        phone: {
            type: String,
            required: false,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["new", "read", "replied", "archived"],
            default: "new",
        },
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

// Delete the model if it exists to ensure fresh schema compilation
if (mongoose.models.Inquiry) {
    delete mongoose.models.Inquiry;
}

export default mongoose.model("Inquiry", InquirySchema);
