import {Schema, model} from "mongoose";

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    price: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

export default model("Product", schema);
