const mongoose = require("mongoose");

const ListTypeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("ListType", ListTypeSchema);