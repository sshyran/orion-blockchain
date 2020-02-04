const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const historySchema = new Schema(
    {
        type: { type: String, required: true },
        asset: { type: String, required: true },
        amount: { type: Number, required: true },
        user: { type: String, required: true }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("History", historySchema);
