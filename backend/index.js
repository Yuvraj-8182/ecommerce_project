const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path =require("path");
const cors = require("cors");
const { error, count } = require("console");
const { type } = require("os");


app.use(express.json());
app.use(cors());

//database connection with mongodb

mongoose.connect("mongodb+srv://ecommerceProject:user123@cluster0.svnahrg.mongodb.net/ecommerce-project?retryWrites=true&w=majority&appName=Cluster0");

//Api creation

app.get("/",(req,res)=>{
    res.send("Express App is running")
})

//Image Storage engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cd)=>{
        return cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint for image
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
       res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
       })
})

//schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})

//  creating api for add product

app.post('/addproduct', async(req, res) =>{
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id +1;
    }
    else{
        id =1;
    }
    const product =new Product({
        id: id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})


// creating api for add product
app.post('/removeproduct', async(req, res) =>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Remove");
    res.json({
        success:true,
        name:req.body.name,
    })
})

// Creating api for get product

app.get('/allproducts',async(req, res)=>{
    let products = await Product.find({});
        console.log("all products Fetched"); 
        res.send(products);
})


//Schema user model

const User = mongoose.model('User',{
    name: {
        type: String,
    },
    email: {
        type:String,
        unique: true,
    },
    password: {
        type:String,
    },
    cartData: {
        type: Object,   
    },
    date: {
        type:Date,
        default:Date.now,
    },
})


//Creating endpoint  for registrering the user

app.post('/signup',async(req,res)=>{
    let check = await User.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, error:"Existing user found with same email address"});
    }

    let cart = {};
    for(let i = 0; i< 300; i++)
        {
            cart[i] = 0;
        }
        const user = new User({
            name: req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
        })
        await user.save();

        const data = {
            user:{
                id:user.id
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({success:true, token})
})

//Creating endpoint  for Login the user

app.post('/login',async (req, res) =>{
let user = await User.findOne({email:req.body.email});
if(user){
    const passMatch = req.body.password == user.password;
    if(passMatch)
        {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success: true, token});
        }else{
            res.json({success:false, error:"Wrong Password"});
        }
}else{
    res.json({success:false,error:"Wrong email address"});
}
})

//creating endpoint for latestproducts

app.get('/newcollections', async(req, res) =>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection fetched")
    res.send(newcollection);
})

//creating endpoint for popular product

app.get('/popularproducts', async (req, res) =>{
    let products = await Product.find({category:"men"});
    let popularproducts = products.slice(0, 4);
    console.log("popular product fetched");
    res.send(popularproducts);
})

//creating endpoint for adding productds in cartdata

app.post('/addtocart', async(req, res) =>{
    
})
app.listen(port,(error)=>{
    if (!error){
        console.log("Server is running on port"+port);
    }
    else{
        console.log("Erorr:" +error);
        
    }
})

