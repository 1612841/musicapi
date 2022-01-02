const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        audio: {
            type: Audio
        },
        author: {
            type: String,
            required: true
        },
        links: {
            type: String,
            required: true
        },
        type: {
            type: String
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("List", ListSchema);