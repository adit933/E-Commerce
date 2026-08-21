import { Category } from "../models/category.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const createCategory = asyncHandler(async(req , res) => {

    const {name , description} = req.body

    if(!name?.trim())
    {
        throw new ApiError(400 , "Category Name is Required !!!")
    }

    if(!description?.trim())
    {
        throw new ApiError(400 , "Description of the product is Required !!!")
    }

    const existedCategory = await Category.findOne({
        name : name.trim(),
        description : description.trim()
    })

    if(existedCategory)
    {
        throw new ApiError(409 , "Category Already Exists !!!")
    }

    const category = await Category.create({
        name : name.trim(),
        description : description.trim()
    })

    if(!category)
    {
        throw new ApiError(500 , "Failed to Create the Category !!! ")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            category,
            "Successfully Added The Category !!!"
        )
    )
})

const getAllCategories = asyncHandler(async(req , res) => {

    const allCategories = await Category.find({})

    if(allCategories.length === 0)
    {
        throw new ApiError(404 , "No Categories Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allCategories,
            "Categories Fetched Successfully !!!"
        )
    )
})

const updateCategory = asyncHandler(async(req , res) => {

    const {categoryId} = req.params

    if(!categoryId)
    {
        throw new ApiError(400 , "Invalid Category Id !!!")
    }

    const {name , description} = req.body

    const updatefield = {}

    if(name?.trim())
    {
        updatefield.name = name.trim()
    }

    if(description?.trim())
    {
        updatefield.description = description.trim()
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            $set : updatefield
        },
        {
            new : true
        }
    )

    if(!updatedCategory)
    {
        throw new ApiError(404 , "No Such Category Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedCategory,
            "Category Updated Successfully !!!"
        )
    )

})

const deleteCategory = asyncHandler(async(req , res) => {

    const {categoryId} = req.params

    if(!categoryId)
    {
        throw new ApiError(400 , "Invalid Category Id !!!")
    }  

    const deletedCategory = await Category.findByIdAndDelete(categoryId)

    if(!deletedCategory)
    {
        throw new ApiError(404 , "No Such Category Exists !!!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Category Deleted Successfully !!!"
        )
    )
})

const toggleIsActive = asyncHandler(async(req , res) => {

    const {categoryId} = req.params
    if(!categoryId)
    {
        throw new ApiError(400 , "Invalid Category Id !!!")
    } 

    const toggledCategory = await Category.findById(categoryId)

    if(!toggledCategory)
    {
        throw new ApiError(404 , "No Such Category Exists !!!")
    }

    toggledCategory.isActive = !toggledCategory.isActive

    await toggledCategory.save({validateBeforeSave : false})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            toggledCategory,
            "Activity status toggled successfully !!!"
        )
    )
})

export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    toggleIsActive
}
