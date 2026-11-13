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

    const page = Math.max(1 , Number(req.query.page) || 1)

    const limit = Math.min(20 , Math.max(1 , Number(req.query.limit)|| 6))

    const skip = (page - 1) * limit

    const [categories , totalCategories] = await Promise.all([

        Category.find({})
        .skip(skip)
        .limit(limit),

        Category.countDocuments()

    ])

    const totalPages = Math.ceil(totalCategories / limit)
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                categories,
                currentPage : page,
                totalPages,
                totalCategories

            },
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

const searchCategory = asyncHandler(async(req , res) => {
    
    const {keyword} = req.query

    if(!keyword?.trim())
    {
        throw new ApiError(400 , "Invalid Product Selected !!!")
    }

    const searchedCategory = await Category.find({
        name : {
            $regex : keyword,
            $options: "i"
        }
    })

    if(searchedCategory.length === 0)
    {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                [],
                "No Category for the searched product !!!"
            )
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            searchedCategory,
            "Category got successfully !!!"
        )
    )

})

const isActiveCategory = asyncHandler(async(req , res) => {

    const activeCategories = await Category.find({
        isActive : true
    })

    let message = ""

    if(activeCategories.length === 0)
    {
        message = "There are no Active Catgeories right now !!!"
    }

    else
    {
        message = "the following are the Active Categories"
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            activeCategories.length === 0 ? [] : activeCategories,
            message
        )
    )
})

const getAllActiveCategoriesAdmin = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true });

    return res.status(200).json(
        new ApiResponse(
            200,
            categories,
            "Active categories fetched successfully"
        )
    );
});

export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    toggleIsActive,
    searchCategory,
    isActiveCategory,
    getAllActiveCategoriesAdmin
}
