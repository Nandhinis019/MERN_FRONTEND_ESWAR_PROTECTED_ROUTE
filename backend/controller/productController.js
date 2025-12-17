const productModel = require("../model/Product")

exports.getProducts = async(req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).json(products)
    }
    catch(error) {
        console.error(error)
        res.status(500).json({error:'server error'})
    }
}

exports.postProduct = async(req, res) => {
    const {name, price, description, image, category, discount, originalPrice, inStock} = req.body
    try {
        const newproduct = new productModel({
            name,
            price,
            description,
            image,
            category,
            discount: discount || 0,
            originalPrice: originalPrice || price,
            inStock: inStock || 0
        })
        await newproduct.save()
        res.status(201).json(newproduct)
    } catch(error) {
        console.error(error)
        res.status(500).json({error:'server error'})
    }
}

exports.deleteProduct = async(req, res) => {
    const {id} = req.params
    try {
        const deleteproduct = await productModel.findByIdAndDelete(id)
        if(!deleteproduct) {
            return res.status(404).json({error:"product not found"})
        }
        res.status(200).json({message:"product deleted successfully"})
    }
    catch(error) {
        console.error(error)
        res.status(500).json({error:"server error"})
    }
}

exports.updateProduct = async(req, res) => {
    const {id} = req.params
    const {name, price, description, image, category, discount, originalPrice, inStock} = req.body
    try {
        const updateproduct = await productModel.findByIdAndUpdate(id, {
            name,
            price,
            description,
            image,
            category,
            discount,
            originalPrice,
            inStock
        }, {new: true})
        if(!updateproduct) {
            return res.status(404).json({error:"product not found"})
        }
        res.status(200).json(updateproduct)
    }
    catch(error) {
        console.error(error)
        res.status(500).json({error:"server error"})
    }
}

exports.updateStock = async(req, res) => {
    const {id} = req.params
    const {quantity} = req.body
    try {
        const product = await productModel.findById(id)
        if(!product) {
            return res.status(404).json({error:"product not found"})
        }

        product.inStock = Math.max(0, product.inStock - quantity)
        await product.save()
        res.status(200).json(product)
    }
    catch(error) {
        console.error(error)
        res.status(500).json({error:"server error"})
    }
}

exports.addReview = async(req, res) => {
    const {id} = req.params
    const {user, rating, comment} = req.body
    try {
        const product = await productModel.findById(id)
        if(!product) {
            return res.status(404).json({error:"product not found"})
        }

        const newReview = {
            user,
            rating,
            comment,
            date: new Date()
        }

        product.reviews.push(newReview)

        // Update average rating
        const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0)
        product.rating = totalRating / product.reviews.length
        product.reviewCount = product.reviews.length

        await product.save()
        res.status(201).json(product)
    }
    catch(error) {
        console.error(error)
        res.status(500).json({error:"server error"})
    }
}

exports.getProductById = async(req, res) => {
    const {id} = req.params
    try {
        const product = await productModel.findById(id)
        if(!product) {
            return res.status(404).json({error:"product not found"})
        }
        res.status(200).json(product)
    }
    catch(error) {
        console.error(error)
        res.status(500).json({error:"server error"})
    }
}
