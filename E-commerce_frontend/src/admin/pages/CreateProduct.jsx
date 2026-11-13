
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    ArrowLeft,
    PackagePlus,
    ImagePlus,
    X,
    Upload,
    Tag,
    IndianRupee,
    Boxes,
    Layers3,
    Star,
    CheckCircle2,
    AlertCircle,
    LoaderCircle,
    FileText,
    RotateCcw
} from "lucide-react";

const CATEGORY_API = "http://localhost:8000/api/v1/category/admin/category";
const PRODUCT_API = "http://localhost:8000/api/v1/product/products";

const CreateProduct = () => {

    const navigate = useNavigate();

    // CATEGORY STATE
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(true);

    // PRODUCT FORM STATE
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        discountPercentage: "0",
        stock: "",
        brand: "",
        category: "",
        isFeatured: false,
        isActive: true
    });

    // IMAGE STATE
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    // FORM STATUS
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // FETCH ACTIVE CATEGORIES
    useEffect(() => {

        const fetchCategories = async () => {

            try {

                setCategoryLoading(true);

                const response = await axios.get(
                    CATEGORY_API,
                    {
                        withCredentials: true
                    }
                );

                const categoryList = response.data.data;

                setCategories(
                    Array.isArray(categoryList)
                        ? categoryList
                        : categoryList?.categories || []
                );

            } catch (err) {

                console.error("Category fetching error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to fetch categories."
                );

            } finally {

                setCategoryLoading(false);

            }

        };

        fetchCategories();

    }, []);

    // HANDLE INPUT CHANGES
    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setProductData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    // HANDLE IMAGE SELECTION
    const handleImageChange = (e) => {

        const selectedImage = e.target.files?.[0];

        if (!selectedImage) return;

        setError("");
        setSuccess("");

        if (!selectedImage.type.startsWith("image/")) {
            setError("Please select a valid image.");
            e.target.value = "";
            return;
        }

        if (selectedImage.size > 5 * 1024 * 1024) {
            setError("Image size should not exceed 5 MB.");
            e.target.value = "";
            return;
        }

        setImage(selectedImage);
        setPreview(URL.createObjectURL(selectedImage));

    };

    // REMOVE SELECTED IMAGE
    const removeImage = () => {

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setImage(null);
        setPreview("");

    };

    // CLEANUP IMAGE PREVIEW URL
    useEffect(() => {

        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };

    }, [preview]);

    // FORM VALIDATION
    const validateForm = () => {

        if (!productData.name.trim()) {
            return "Product name is required.";
        }

        if (!productData.description.trim()) {
            return "Product description is required.";
        }

        if (
            productData.description.trim().length < 20 ||
            productData.description.trim().length > 500
        ) {
            return "Description must contain between 20 and 500 characters.";
        }

        if (!productData.brand.trim()) {
            return "Brand name is required.";
        }

        if (!productData.category) {
            return "Please select a category.";
        }

        if (
            productData.price === "" ||
            !Number.isFinite(Number(productData.price)) ||
            Number(productData.price) < 0
        ) {
            return "Please enter a valid product price.";
        }

        if (
            productData.stock === "" ||
            !Number.isInteger(Number(productData.stock)) ||
            Number(productData.stock) < 0
        ) {
            return "Please enter a valid stock quantity.";
        }

        if (
            productData.discountPercentage === "" ||
            !Number.isFinite(Number(productData.discountPercentage)) ||
            Number(productData.discountPercentage) < 0 ||
            Number(productData.discountPercentage) > 100
        ) {
            return "Discount must be between 0 and 100.";
        }

        if (!image) {
            return "Please upload a product image.";
        }

        return null;

    };

    // SUBMIT PRODUCT
    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("name", productData.name.trim());
            formData.append(
                "description",
                productData.description.trim()
            );

            formData.append("brand", productData.brand.trim());
            formData.append("category", productData.category);

            formData.append("price", Number(productData.price));
            formData.append(
                "discountPercentage",
                Number(productData.discountPercentage)
            );

            formData.append("stock", Number(productData.stock));

            formData.append(
                "isFeatured",
                productData.isFeatured
            );

            formData.append(
                "isActive",
                productData.isActive
            );

            formData.append("image", image);

            const response = await axios.post(
                PRODUCT_API,
                formData,
                {
                    withCredentials: true
                }
            );

            setSuccess(
                response.data.message ||
                "Product created successfully!"
            );

            setTimeout(() => {
                navigate("/admin/product-managment");
            }, 1200);

        } catch (err) {

            console.error("Product creation error:", err);

            setError(
                err.response?.data?.message ||
                "Something went wrong while creating the product."
            );

        } finally {

            setLoading(false);

        }

    };

    // RESET FORM
    const handleReset = () => {

        setProductData({
            name: "",
            description: "",
            price: "",
            discountPercentage: "0",
            stock: "",
            brand: "",
            category: "",
            isFeatured: false,
            isActive: true
        });

        removeImage();

        setError("");
        setSuccess("");

    };

    return (

        <div className="cp-page">

            <style>{createProductStyles}</style>

            {/* BACKGROUND EFFECTS */}

            <div className="cp-atmosphere">
                <div className="cp-orb cp-orb-one"></div>
                <div className="cp-orb cp-orb-two"></div>
                <div className="cp-grid-bg"></div>
            </div>

            {/* PAGE HEADER */}

            <div className="cp-header">

                <div className="cp-header-left">

                    <button
                        type="button"
                        className="cp-back-btn"
                        onClick={() => navigate("/admin/product-managment")}
                    >
                        <ArrowLeft size={17} />
                        Back to Products
                    </button>

                    <div className="cp-heading-row">

                        <div className="cp-heading-icon">
                            <PackagePlus size={27} />
                        </div>

                        <div>
                            <p className="cp-label">
                                PRODUCT MANAGEMENT
                            </p>

                            <h1 className="cp-heading">
                                Create Product
                            </h1>

                            <p className="cp-subtitle">
                                Add a new product to your store
                                and manage its inventory.
                            </p>
                        </div>

                    </div>

                </div>

                <div className="cp-header-tag">
                    <Layers3 size={16} />
                    New Product
                </div>

            </div>

            {/* FORM */}

            <form
                className="cp-form"
                onSubmit={handleSubmit}
            >

                {/* BASIC INFORMATION */}

                <section className="cp-section">

                    <div className="cp-section-heading">

                        <div className="cp-section-icon">
                            <FileText size={20} />
                        </div>

                        <div>
                            <h2>Basic Information</h2>
                            <p>Enter the essential product details.</p>
                        </div>

                    </div>

                    <div className="cp-fields-grid">

                        <div className="cp-field cp-full">

                            <label htmlFor="name">
                                Product Name <span>*</span>
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter product name"
                                value={productData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="cp-field">

                            <label htmlFor="brand">
                                Brand Name <span>*</span>
                            </label>

                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                placeholder="Enter brand name"
                                value={productData.brand}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="cp-field">

                            <label htmlFor="category">
                                Product Category <span>*</span>
                            </label>

                            <select
                                id="category"
                                name="category"
                                value={productData.category}
                                onChange={handleChange}
                                disabled={categoryLoading || categories.length === 0}
                                required
                            >

                                <option value="">
                                    {categoryLoading
                                        ? "Loading categories..."
                                        : categories.length === 0
                                            ? "No active categories available"
                                            : "Select a category"
                                    }
                                </option>

                                {categories.map((category) => (

                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>

                                ))}

                            </select>

                            {!categoryLoading && categories.length === 0 && (
                                <small className="cp-field-hint">
                                    Please ensure that active categories exist.
                                </small>
                            )}

                        </div>

                        <div className="cp-field cp-full">

                            <label htmlFor="description">
                                Product Description <span>*</span>
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                placeholder="Describe your product, its features and details..."
                                value={productData.description}
                                onChange={handleChange}
                                maxLength={500}
                                rows={5}
                                required
                            />

                            <div className="cp-character-count">
                                {productData.description.length}/500 characters
                            </div>

                        </div>

                    </div>

                </section>

                {/* PRICING AND INVENTORY */}

                <section className="cp-section">

                    <div className="cp-section-heading">

                        <div className="cp-section-icon">
                            <IndianRupee size={20} />
                        </div>

                        <div>
                            <h2>Pricing & Inventory</h2>
                            <p>Set the product price and stock availability.</p>
                        </div>

                    </div>

                    <div className="cp-fields-grid">

                        <div className="cp-field">

                            <label htmlFor="price">
                                Product Price (₹) <span>*</span>
                            </label>

                            <div className="cp-input-icon">

                                <IndianRupee size={17} />

                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    value={productData.price}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="cp-field">

                            <label htmlFor="discountPercentage">
                                Discount Percentage (%)
                            </label>

                            <input
                                type="number"
                                id="discountPercentage"
                                name="discountPercentage"
                                placeholder="0"
                                min="0"
                                max="100"
                                step="0.01"
                                value={productData.discountPercentage}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="cp-field">

                            <label htmlFor="stock">
                                Available Stock <span>*</span>
                            </label>

                            <div className="cp-input-icon">

                                <Boxes size={17} />

                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    placeholder="Enter quantity"
                                    min="0"
                                    step="1"
                                    value={productData.stock}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="cp-price-preview">

                            <span>Discounted Price</span>

                            <strong>
                                ₹{
                                    productData.price !== "" &&
                                    Number.isFinite(Number(productData.price))
                                        ? (
                                            Number(productData.price) *
                                            (1 - Number(productData.discountPercentage || 0) / 100)
                                        ).toFixed(2)
                                        : "0.00"
                                }
                            </strong>

                            <small>
                                Calculated from your price and discount.
                            </small>

                        </div>

                    </div>

                </section>

                {/* PRODUCT IMAGE */}

                <section className="cp-section">

                    <div className="cp-section-heading">

                        <div className="cp-section-icon">
                            <ImagePlus size={20} />
                        </div>

                        <div>
                            <h2>Product Image</h2>
                            <p>Upload an attractive image of your product.</p>
                        </div>

                    </div>

                    <div className="cp-upload-area">

                        {!preview ? (

                            <label
                                htmlFor="product-image"
                                className="cp-upload-box"
                            >

                                <div className="cp-upload-icon">
                                    <Upload size={27} />
                                </div>

                                <h3>Upload Product Image</h3>

                                <p>
                                    Click to browse or select an image
                                    from your device.
                                </p>

                                <span>
                                    PNG, JPG, JPEG or WEBP · Maximum 5 MB
                                </span>

                                <input
                                    type="file"
                                    id="product-image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    hidden
                                />

                            </label>

                        ) : (

                            <div className="cp-preview-container">

                                <div className="cp-preview-image">
                                    <img
                                        src={preview}
                                        alt="Product preview"
                                    />
                                </div>

                                <div className="cp-preview-details">

                                    <div>
                                        <h3>Image Selected</h3>

                                        <p>
                                            {image?.name}
                                        </p>

                                        <span>
                                            {(image?.size / (1024 * 1024)).toFixed(2)} MB
                                        </span>
                                    </div>

                                    <div className="cp-preview-actions">

                                        <label
                                            htmlFor="product-image"
                                            className="cp-change-image"
                                        >
                                            Change Image
                                        </label>

                                        <input
                                            type="file"
                                            id="product-image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            hidden
                                        />

                                        <button
                                            type="button"
                                            className="cp-remove-image"
                                            onClick={removeImage}
                                        >
                                            <X size={15} />
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </section>

                {/* PRODUCT SETTINGS */}

                <section className="cp-section">

                    <div className="cp-section-heading">

                        <div className="cp-section-icon">
                            <Tag size={20} />
                        </div>

                        <div>
                            <h2>Product Settings</h2>
                            <p>Configure product visibility and featured status.</p>
                        </div>

                    </div>

                    <div className="cp-settings-grid">

                        <label className="cp-setting-card">

                            <div className="cp-setting-icon featured-icon">
                                <Star size={20} />
                            </div>

                            <div className="cp-setting-content">
                                <strong>Featured Product</strong>
                                <span>
                                    Display this product in featured sections.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={productData.isFeatured}
                                onChange={handleChange}
                            />

                            <span className="cp-toggle"></span>

                        </label>

                        <label className="cp-setting-card">

                            <div className="cp-setting-icon active-icon">
                                <CheckCircle2 size={20} />
                            </div>

                            <div className="cp-setting-content">
                                <strong>Active Product</strong>
                                <span>
                                    Make this product available in your store.
                                </span>
                            </div>

                            <input
                                type="checkbox"
                                name="isActive"
                                checked={productData.isActive}
                                onChange={handleChange}
                            />

                            <span className="cp-toggle"></span>

                        </label>

                    </div>

                </section>

                {/* ERROR MESSAGE */}

                {error && (

                    <div className="cp-message cp-error">
                        <AlertCircle size={19} />
                        {error}
                    </div>

                )}

                {/* SUCCESS MESSAGE */}

                {success && (

                    <div className="cp-message cp-success">
                        <CheckCircle2 size={19} />
                        {success}
                    </div>

                )}

                {/* FORM ACTIONS */}

                <div className="cp-form-actions">

                    <button
                        type="button"
                        className="cp-reset-btn"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        <RotateCcw size={17} />
                        Reset Form
                    </button>

                    <button
                        type="button"
                        className="cp-cancel-btn"
                        onClick={() => navigate("/admin/product-managment")}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="cp-submit-btn"
                        disabled={loading || categoryLoading || categories.length === 0}

                    >

                        {loading ? (
                            <>
                                <LoaderCircle className="cp-spinner" size={18} />
                                Creating Product...
                            </>
                        ) : (
                            <>
                                <PackagePlus size={18} />
                                Create Product
                            </>
                        )}

                    </button>

                </div>

            </form>

        </div>

    );

};

export default CreateProduct;


// =======================================
// CREATE PRODUCT PAGE STYLES
// =======================================

const createProductStyles = `

.cp-page {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    min-height: 100%;
    box-sizing: border-box;
    padding: 32px 38px 45px;
     overflow: wrap;
    color: #f1f5f9;
    scrollbar-width: thin;
    scrollbar-color: rgba(139,92,246,.5) transparent;
}

.cp-page * {
    box-sizing: border-box;
}

.cp-atmosphere {
    position: absolute;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
}

.cp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: .16;
    animation: cpFloat 12s ease-in-out infinite alternate;
}

.cp-orb-one {
    width: 330px;
    height: 330px;
    background: #7c3aed;
    top: -170px;
    left: 8%;
}

.cp-orb-two {
    width: 280px;
    height: 280px;
    background: #2563eb;
    top: 45%;
    right: -180px;
    animation-delay: -5s;
}

.cp-grid-bg {
    position: absolute;
    inset: 0;
    opacity: .055;
    background-image:
        linear-gradient(#a5b4fc 1px, transparent 1px),
        linear-gradient(90deg, #a5b4fc 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(to bottom, black, transparent 90%);
}

/* HEADER */

.cp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
    animation: cpFadeUp .6s ease both;
}

.cp-back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 13px;
    margin-bottom: 24px;
    border: 1px solid rgba(167,139,250,.2);
    border-radius: 10px;
    background: rgba(30,41,70,.4);
    color: #c4b5fd;
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;
    transition: .25s ease;
}

.cp-back-btn:hover {
    background: rgba(139,92,246,.2);
    border-color: rgba(167,139,250,.6);
    transform: translateX(-3px);
}

.cp-heading-row {
    display: flex;
    align-items: center;
    gap: 17px;
}

.cp-heading-icon {
    width: 57px;
    height: 57px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 17px;
    color: #ddd6fe;
    background: linear-gradient(
        135deg,
        rgba(124,58,237,.32),
        rgba(59,130,246,.2)
    );
    border: 1px solid rgba(167,139,250,.28);
    box-shadow: 0 8px 25px rgba(124,58,237,.15);
}

.cp-label {
    color: #a78bfa;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 6px;
}

.cp-heading {
    font-size: clamp(27px, 3vw, 35px);
    font-weight: 850;
    letter-spacing: -1px;
    margin: 0;
    background: linear-gradient(
        110deg,
        #c4b5fd,
        #60a5fa,
        #e879f9
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.cp-subtitle {
    margin: 8px 0 0;
    color: #94a3b8;
    font-size: 13px;
    line-height: 1.6;
}

.cp-header-tag {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 12px 17px;
    border-radius: 12px;
    color: #c4b5fd;
    border: 1px solid rgba(167,139,250,.23);
    background: rgba(30,41,70,.4);
    font-size: 12px;
    font-weight: 700;
}

/* FORM */

.cp-form {
    width: 100%;
    max-width: 1100px;
    margin: auto;
    animation: cpFadeUp .8s ease both;
}

.cp-section {
    padding: 27px;
    margin-bottom: 23px;
    border: 1px solid rgba(148,163,184,.14);
    border-radius: 19px;
    background: rgba(15,23,42,.55);
    backdrop-filter: blur(16px);
    box-shadow: 0 10px 35px rgba(0,0,0,.13);
    transition: border-color .3s ease, box-shadow .3s ease;
}

.cp-section:hover {
    border-color: rgba(167,139,250,.3);
    box-shadow: 0 12px 35px rgba(0,0,0,.18);
}

.cp-section-heading {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-bottom: 21px;
    margin-bottom: 24px;
    border-bottom: 1px solid rgba(148,163,184,.12);
}

.cp-section-icon {
    width: 43px;
    height: 43px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    color: #c4b5fd;
    border-radius: 12px;
    background: rgba(139,92,246,.17);
    border: 1px solid rgba(167,139,250,.16);
}

.cp-section-heading h2 {
    color: #f1f5f9;
    font-size: 17px;
    font-weight: 750;
    margin: 0 0 5px;
}

.cp-section-heading p {
    color: #94a3b8;
    font-size: 12px;
    margin: 0;
}

/* INPUT GRID */

.cp-fields-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 23px 25px;
}

.cp-field {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 10px;
}

.cp-full {
    grid-column: 1 / -1;
}

.cp-field label {
    color: #cbd5e1;
    font-size: 12px;
    font-weight: 700;
}

.cp-field label span {
    color: #f87171;
}

.cp-field input,
.cp-field select,
.cp-field textarea {
    width: 100%;
    min-width: 0;
    padding: 13px 15px;
    border: 1px solid rgba(148,163,184,.2);
    border-radius: 11px;
    outline: none;
    background: rgba(30,41,70,.48);
    color: #f1f5f9;
    font-family: inherit;
    font-size: 13px;
    transition: .25s ease;
}

.cp-field input,
.cp-field select {
    height: 47px;
}

.cp-field textarea {
    resize: vertical;
    min-height: 120px;
    line-height: 1.7;
}

.cp-field input::placeholder,
.cp-field textarea::placeholder {
    color: #64748b;
}

.cp-field input:focus,
.cp-field select:focus,
.cp-field textarea:focus {
    border-color: #8b5cf6;
    background: rgba(49,46,129,.2);
    box-shadow: 0 0 0 3px rgba(139,92,246,.12);
}

.cp-field select {
    cursor: pointer;
    color-scheme: dark;
}

.cp-field select:disabled {
    opacity: .55;
    cursor: not-allowed;
}

.cp-field select option {
    background: #172036;
    color: white;
}

.cp-field input[type="number"] {
    color-scheme: dark;
}

.cp-character-count {
    text-align: right;
    font-size: 11px;
    color: #64748b;
}

.cp-field-hint {
    color: #fbbf24;
    font-size: 11px;
}

/* INPUT ICONS */

.cp-input-icon {
    position: relative;
    display: flex;
    align-items: center;
}

.cp-input-icon > svg {
    position: absolute;
    left: 14px;
    color: #a78bfa;
    pointer-events: none;
}

.cp-input-icon input {
    padding-left: 42px;
}

/* PRICE PREVIEW */

.cp-price-preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    min-height: 76px;
    padding: 13px 17px;
    border: 1px solid rgba(167,139,250,.18);
    border-radius: 12px;
    background: linear-gradient(
        110deg,
        rgba(124,58,237,.12),
        rgba(37,99,235,.09)
    );
}

.cp-price-preview span {
    color: #a5b4fc;
    font-size: 11px;
    font-weight: 700;
}

.cp-price-preview strong {
    color: #e9d5ff;
    font-size: 21px;
    font-weight: 800;
}

.cp-price-preview small {
    color: #94a3b8;
    font-size: 10px;
}

/* IMAGE UPLOAD */

.cp-upload-area {
    width: 100%;
}

.cp-upload-box {
    min-height: 205px;
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    text-align: center;
    cursor: pointer;
    border: 1px dashed rgba(167,139,250,.4);
    border-radius: 15px;
    background: rgba(49,46,129,.09);
    transition: .3s ease;
}

.cp-upload-box:hover {
    border-color: #a78bfa;
    background: rgba(124,58,237,.13);
    transform: translateY(-3px);
}

.cp-upload-icon {
    width: 55px;
    height: 55px;
    display: grid;
    place-items: center;
    border-radius: 16px;
    background: rgba(139,92,246,.19);
    color: #c4b5fd;
    transition: .3s ease;
}

.cp-upload-box:hover .cp-upload-icon {
    transform: translateY(-4px);
}

.cp-upload-box h3 {
    margin: 0;
    color: #e2e8f0;
    font-size: 15px;
}

.cp-upload-box p {
    margin: 0;
    color: #94a3b8;
    font-size: 12px;
}

.cp-upload-box span {
    color: #64748b;
    font-size: 10px;
}

/* IMAGE PREVIEW */

.cp-preview-container {
    display: flex;
    align-items: center;
    gap: 22px;
    padding: 18px;
    border: 1px solid rgba(167,139,250,.24);
    border-radius: 15px;
    background: rgba(30,41,70,.38);
    animation: cpFadeUp .35s ease both;
}

.cp-preview-image {
    width: 155px;
    height: 145px;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 12px;
    background: rgba(49,46,129,.3);
}

.cp-preview-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.cp-preview-details {
    min-width: 0;
    flex: 1;
}

.cp-preview-details h3 {
    margin: 0 0 8px;
    color: #c4b5fd;
    font-size: 15px;
}

.cp-preview-details p {
    margin: 0 0 7px;
    color: #e2e8f0;
    font-size: 12px;
    overflow-wrap: anywhere;
}

.cp-preview-details > div > span {
    color: #94a3b8;
    font-size: 11px;
}

.cp-preview-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
}

.cp-change-image,
.cp-remove-image {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 12px;
    border-radius: 9px;
    cursor: pointer;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    transition: .25s ease;
}

.cp-change-image {
    color: #c4b5fd;
    background: rgba(139,92,246,.15);
    border: 1px solid rgba(167,139,250,.24);
}

.cp-remove-image {
    color: #fca5a5;
    background: rgba(239,68,68,.1);
    border: 1px solid rgba(248,113,113,.18);
}

.cp-change-image:hover,
.cp-remove-image:hover {
    transform: translateY(-2px);
    filter: brightness(1.2);
}

/* SETTINGS */

.cp-settings-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 17px;
}

.cp-setting-card {
    position: relative;
    display: flex;
    align-items: center;
    gap: 13px;
    min-width: 0;
    padding: 17px;
    border: 1px solid rgba(148,163,184,.15);
    border-radius: 14px;
    background: rgba(30,41,70,.34);
    cursor: pointer;
    transition: .3s ease;
}

.cp-setting-card:hover {
    border-color: rgba(167,139,250,.4);
    transform: translateY(-3px);
    background: rgba(49,46,129,.16);
}

.cp-setting-icon {
    width: 41px;
    height: 41px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 11px;
}

.featured-icon {
    color: #fcd34d;
    background: rgba(245,158,11,.13);
}

.active-icon {
    color: #86efac;
    background: rgba(34,197,94,.13);
}

.cp-setting-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.cp-setting-content strong {
    color: #e2e8f0;
    font-size: 12px;
}

.cp-setting-content span {
    color: #94a3b8;
    font-size: 10px;
    line-height: 1.5;
}

.cp-setting-card input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
}

.cp-toggle {
    width: 39px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 30px;
    background: #475569;
    position: relative;
    transition: .3s ease;
}

.cp-toggle::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    top: 3px;
    left: 3px;
    border-radius: 50%;
    background: white;
    transition: .3s ease;
}

.cp-setting-card input:checked + .cp-toggle {
    background: linear-gradient(110deg,#7c3aed,#6366f1);
}

.cp-setting-card input:checked + .cp-toggle::after {
    transform: translateX(17px);
}

.cp-setting-card input:focus-visible + .cp-toggle {
    outline: 2px solid #c4b5fd;
    outline-offset: 3px;
}

/* ALERTS */

.cp-message {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 14px 17px;
    margin-bottom: 20px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    animation: cpFadeUp .3s ease both;
}

.cp-error {
    color: #fca5a5;
    background: rgba(239,68,68,.1);
    border: 1px solid rgba(248,113,113,.23);
}

.cp-success {
    color: #86efac;
    background: rgba(34,197,94,.1);
    border: 1px solid rgba(34,197,94,.22);
}

/* BUTTONS */

.cp-form-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    padding: 19px 0;
}

.cp-reset-btn,
.cp-cancel-btn,
.cp-submit-btn {
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 19px;
    border-radius: 11px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.cp-reset-btn {
    margin-right: auto;
    color: #c4b5fd;
    background: rgba(139,92,246,.1);
    border: 1px solid rgba(167,139,250,.2);
}

.cp-cancel-btn {
    color: #cbd5e1;
    background: rgba(30,41,70,.45);
    border: 1px solid rgba(148,163,184,.2);
}

.cp-submit-btn {
    color: white;
    background: linear-gradient(110deg,#7c3aed,#6366f1,#9333ea);
    border: 1px solid rgba(167,139,250,.25);
    box-shadow: 0 7px 22px rgba(124,58,237,.24);
}

.cp-reset-btn:hover,
.cp-cancel-btn:hover,
.cp-submit-btn:hover:not(:disabled) {
    transform: translateY(-3px);
}

.cp-submit-btn:hover:not(:disabled) {
    box-shadow: 0 12px 28px rgba(124,58,237,.4);
}

.cp-reset-btn:disabled,
.cp-cancel-btn:disabled,
.cp-submit-btn:disabled {
    opacity: .5;
    cursor: not-allowed;
}

.cp-spinner {
    animation: cpSpin 1s linear infinite;
}

/* ANIMATIONS */

@keyframes cpFadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes cpFloat {
    from {
        transform: translate3d(0,0,0) scale(1);
    }

    to {
        transform: translate3d(20px,-20px,0) scale(1.12);
    }
}

@keyframes cpSpin {
    to {
        transform: rotate(360deg);
    }
}

/* RESPONSIVE */

@media(max-width: 1000px) {

    .cp-page {
        padding: 25px 22px 35px;
    }

    .cp-section {
        padding: 23px;
    }

}

@media(max-width: 700px) {

    .cp-page {
        padding: 20px 15px 30px;
    }

    .cp-header {
        align-items: flex-start;
    }

    .cp-heading-row {
        gap: 12px;
    }

    .cp-heading-icon {
        width: 47px;
        height: 47px;
    }

    .cp-header-tag {
        display: none;
    }

    .cp-fields-grid,
    .cp-settings-grid {
        grid-template-columns: 1fr;
    }

    .cp-full {
        grid-column: auto;
    }

    .cp-section {
        padding: 19px;
    }

    .cp-section-heading h2 {
        font-size: 15px;
    }

    .cp-preview-container {
        flex-direction: column;
        align-items: stretch;
    }

    .cp-preview-image {
        width: 100%;
        height: 200px;
    }

    .cp-form-actions {
        justify-content: stretch;
    }

    .cp-reset-btn {
        margin-right: 0;
    }

    .cp-reset-btn,
    .cp-cancel-btn,
    .cp-submit-btn {
        flex: 1;
        padding: 0 11px;
    }

}

@media(max-width: 420px) {

    .cp-form-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .cp-reset-btn {
        grid-column: 1 / -1;
    }

    .cp-submit-btn {
        grid-column: 1 / -1;
    }

}

@media(prefers-reduced-motion: reduce) {

    .cp-orb,
    .cp-header,
    .cp-form,
    .cp-message {
        animation: none !important;
    }

    .cp-page * {
        transition: none !important;
    }

}

`;
