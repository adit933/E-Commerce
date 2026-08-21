import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        discountPercentage,
        stock,
        category,
        brand
    } = req.body

    const updateField = {}

    // ---------------------------
    // 1. Required string fields
    // ---------------------------
    if (!name?.trim()) {
        throw new ApiError(400, "Name of the product is required")
    }

    if (!description?.trim()) {
        throw new ApiError(400, "Description of the product is required")
    }

    if (!category?.trim()) {
        throw new ApiError(400, "Category is required")
    }

    if (!brand?.trim()) {
        throw new ApiError(400, "Brand is required")
    }

    // ---------------------------
    // 2. Required numeric fields (check BEFORE conversion)
    // ---------------------------
    if (price == null) {
        throw new ApiError(400, "Price is required")
    }

    if (stock == null) {
        throw new ApiError(400, "Stock is required")
    }

    // ---------------------------
    // 3. Convert to numbers
    // ---------------------------
    const numericPrice = Number(price)
    const numericStock = Number(stock)

    // ---------------------------
    // 4. Validate numbers
    // ---------------------------
    if (isNaN(numericPrice)) {
        throw new ApiError(400, "Invalid price")
    }

    if (numericPrice < 0) {
        throw new ApiError(400, "Price cannot be negative")
    }

    if (isNaN(numericStock)) {
        throw new ApiError(400, "Invalid stock")
    }

    if (numericStock < 0) {
        throw new ApiError(400, "Stock cannot be negative")
    }

    // ---------------------------
    // 5. Optional field: discount
    // ---------------------------
    let numericDiscount = null

    if (discountPercentage != null) {
        numericDiscount = Number(discountPercentage)

        if (isNaN(numericDiscount)) {
            throw new ApiError(400, "Invalid discount percentage")
        }

        if (numericDiscount < 0 || numericDiscount > 100) {
            throw new ApiError(400, "Discount must be between 0 and 100")
        }
    }

    // ---------------------------
    // 6. Image validation
    // ---------------------------
    const imageLocalPath = req.files?.image?.[0]?.path

    if (!imageLocalPath) {
        throw new ApiError(400, "Product image is required")
    }

    const uploadedImage = await uploadOnCloudinary(imageLocalPath)

    if (!uploadedImage?.url) {
        throw new ApiError(400, "Image upload failed")
    }

    // ---------------------------
    // 7. Build object for DB
    // ---------------------------
    updateField.name = name.trim()
    updateField.description = description.trim()
    updateField.price = numericPrice
    updateField.stock = numericStock
    updateField.category = category.trim()
    updateField.brand = brand.trim()
    updateField.image = uploadedImage.url

    if (numericDiscount != null) {
        updateField.discountPercentage = numericDiscount
    }

    // ---------------------------
    // 8. Create product
    // ---------------------------
    const createdProduct = await Product.create(updateField)

    if (!createdProduct) {
        throw new ApiError(500, "Failed to create product")
    }

    // ---------------------------
    // 9. Response
    // ---------------------------
    return res.status(201).json(
        new ApiResponse(
            201,
            createdProduct,
            "Product created successfully"
        )
    )
})

const getAllProducts = asyncHandler(async (req , res) => {

    const {page = 1 , limit = 20} = req.query

    const skip = (page - 1) * limit

    const allProducts = await Product.find({})
    .skip(skip) // the following two are for pagination for representing limited products
    .limit(limit)

    if(allProducts.length === 0)
    {
        throw new ApiError(404 , "There Are No Products at Present !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allProducts,
            "All Products Fetched Successfully !!!"
        )
    )
})

const getProductById = asyncHandler(async(req , res) => {

    const {productId} = req.params

    if(!productId)
    {
        throw new ApiError(400 , "Invalid Product ID !!!")
    }

    const product = await Product.findOne({
        _id : productId
    })

    if(!product)
    {
        throw new ApiError(404 , "The Product does not Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            product,
            "Product Fetched Successfully !!!"
        )
    )
})

const updateProduct = asyncHandler(async(req , res) => {
    
    const {productId} = req.params

    if(!mongoose.Types.ObjectId.isValid(productId))
    {
        throw new ApiError(400 , "Invalid Product Id !!!")
    }

    const updateField = {}

    const {
        name,
        description,
        price,
        discountPercentage,
        stock,
        category,
        brand
    } = req.body

    if (name?.trim()) {
        updateField.name = name
    }

    if (description?.trim()) {
        updateField.description = description
    }

    if (category?.trim()) {
        updateField.category = category
    }

    if (brand?.trim()) {
        updateField.brand = brand
    }

    if(price != null)
    {
        const numericPrice = Number(price)

        if(isNaN(numericPrice))
        {
            throw new ApiError(400 , "Enter a valid price !!!")
        }

        if(numericPrice < 0)
        {
            throw new ApiError(400 , "Negative Price is not allowed !!!")
        }

        updateField.price = numericPrice
    }

    if(stock != null)
    {
        const numericStock = Number(stock)

        if(isNaN(numericStock))
        {
            throw new ApiError(400 , "Enter a valid Stock !!!")
        }

        if(numericStock < 0)
        {
            throw new ApiError(400 , "Negative Stock is not allowed !!!")
        }

        updateField.stock = numericStock
    }

    const imageLocalPath = req.files?.image?.[0]?.path

    if(imageLocalPath)
    {
        const uploadedImage = await uploadOnCloudinary(imageLocalPath)

        if(!uploadedImage?.url)
        {
            throw new ApiError(400 , "Image Upload Failed !!! ")
        }

        updateField.image = uploadedImage?.url
    }

    if(discountPercentage != null)
    {
        const numericDiscount = Number(discountPercentage)

        if(isNaN(numericDiscount))
        {
            throw new ApiError(400 , "Invalid Discount Percentage !!!")
        }

        if(numericDiscount < 0 || numericDiscount > 100)
        {
            throw new ApiError(400 , "Discount Percentage should be between 0 and 100 !!!")
        }

        updateField.discountPercentage = numericDiscount
    }

    if(Object.keys(updateField).length === 0) // user provided no value therefore updatefield is empty
    {
        return res
        .status(200)
        .json(
            new ApiResponse (
                200,
                updatedProduct,
                "Product up to Date !!! "
            )
        )
    }

    const updatedProduct = await Product.findByIdAndUpdate(

        productId,
        {
            $set : updateField
        },
        {
            new : true
        }
    )

    if(!updatedProduct)
    {
        throw new ApiError(404 , "No Such Product Exists !!! ")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedProduct,
            "Product Updated Successfully !!! "
        )
    ) 
})

const deleteProduct = asyncHandler(async (req , res) => {

    const {productId} = req.params

    if(!mongoose.Types.ObjectId.isValid(productId))
    {
        throw new ApiError(400 , "Invalid Product Id !!! ")
    }

    const deletedProduct = await Product.findByIdAndDelete(productId)

    if(!deletedProduct)
    {
        throw new ApiError(404 , "No such Product found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            deletedProduct,
            "Product Deleted Successfully !!!"
        )
    )
})

const searchProducts = asyncHandler(async(req , res) => {

    const {keyword} = req.query

    if(!keyword?.trim())
    {
        throw new ApiError(400 , "Invalid Product Selected !!! ")
    }

    const searchedProducts = await Products.find({
        $or : [{
            name : {
                $regex : keyword,
                $options : "i"
            }
        } , 
        {
            brand : {
                $regex : keyword,
                $options : "i"
            }
        }
    ]
    })

    if(searchedProducts.length === 0)
    {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "There Are no Products with for the following word !!!"
            )
        )
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                searchedProducts,
                "Products fetched Successfully  !!!"
            )
        )
})

const filterProducts = asyncHandler(async(req , res) => {

    const {brand , category , minPrice , maxPrice} = req.query

    const filterField = {}

    if(brand?.trim())
    {
        filterField.brand = brand
    }

    if(mongoose.Types.ObjectId.isValid(category))
    {
        filterField.category = category
    }

    if(minPrice || maxPrice)
    {
        filterField.price = {}

        if(minPrice)
        {
            filterField.price.$gte = Number(minPrice)
        }

        if(maxPrice)
        {
            filterField.price.$lte = Number(maxPrice)
        }
    }

    const filteredProducts = await Product.find(filterField)

    if(filteredProducts.length === 0)
    {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                [],
                "No Products that belong to this category!!!"
            )
        )
    }

    
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                filteredProducts,
                "Products Fetched Successfully !!!"
            )
        )
})

const toggleFeaturedProduct = asyncHandler(async(req , res) => {
    const {productId} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(productId))
    {
        throw new ApiError(400 , "Invalid Product Selected !!!")
    }

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(404 , "No such Product Exists !!! ")
    }

    product.isFeatured = !product.isFeatured

    let message = ""

    if(product.isFeatured)
    {
        message = " Product Got Featured !!!"
    }

    else
    {
        message = "Product Got Removed from being Featured !!!"
    }

    await product.save({validateBeforeSave : false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
           message
        )
    )
})

const toggleIsActive = asyncHandler(async(req , res) => {
    const {productId} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(productId))
    {
        throw new ApiError(400 , "Invalid Product Selected !!!")
    }

    const product = await Product.findById(productId)

    if(!product)
    {
        throw new ApiError(404 , "No such Product Exists !!! ")
    }

    product.isActive = !product.isActive

    let message = ""

    if(product.isActive)
    {
        message = "Product Status Active !!!"
    }

    else
    {
        message = "Product Status Inactive !!!"
    }

    product.save({validateBeforeSave : false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            product,
            message
        )
    )
})

const getFeaturedProducts = asyncHandler(async(req , res) => {
    
    const featuredProduct = await Product.find({
        isFeatured : true
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            featuredProduct,
            "Fetched all Featured Products !!!"
        )
    )
})

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts,
    toggleFeaturedProduct,
    toggleIsActive,
    getFeaturedProducts

}