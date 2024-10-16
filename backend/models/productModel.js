const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name:{type: String},
    image:{type: String, default:""},
    images:[{type: String}],
    brand:{type: String, default:""},
    description:{type: String, default:""},
    richDescription:{type: String, default:""},
    price : {type: Number, default :0},
    category:{type: mongoose.Schema.Types.ObjectId, ref: 'Category' , default:""},
    countInStock:{type: Number,  required: true, min:0, max:255},
    rating: {type: Number, default :0},
    numReviews: {type: Number, default :0},
    isFeatured : {type: Boolean , default: false},
    dateCreated : {type: Date, default: Date.now}
},{timestamps: true}
);

productSchema.virtual("id").get(function(){
    return this._id.toHexString();
});

productSchema.set("toJSON", {
    virtuals: true
});
 
const Product  = mongoose.model("Product", productSchema);

module.exports = Product 