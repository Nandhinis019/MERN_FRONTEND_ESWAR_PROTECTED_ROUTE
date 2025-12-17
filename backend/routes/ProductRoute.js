const express=require("express");
const { getProducts, postProduct, deleteProduct, updateProduct } = require("../controller/productController");
const router=express.Router();

router.get("/product",getProducts)
router.post("/postProduct", postProduct)
router.delete("/deleteProduct/:id", deleteProduct)
router.put("/updateProduct/:id", updateProduct)
module.exports=router;