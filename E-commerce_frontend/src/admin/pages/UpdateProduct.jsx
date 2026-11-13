
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductStyles = `

.cp-page {
    position: relative;
    isolation: isolate;
    width: 100%;
    min-width: 0;
    min-height: 100vh;
    padding: 32px 38px 45px;
    overflow-x: hidden;
    color: #f1f5f9;
    background: #080d1b;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgba(139,92,246,.5) transparent;
}

.cp-page * {
    box-sizing: border-box;
}

.cp-page h1,
.cp-page h2,
.cp-page h3,
.cp-page p,
.cp-page label,
.cp-page span,
.cp-page small,
.cp-page input,
.cp-page textarea,
.cp-page button {
    font-family: inherit;
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
    filter: blur(85px);
    opacity: .17;
    animation: cpFloat 12s ease-in-out infinite alternate;
}

.cp-orb-one {
    width: 350px;
    height: 350px;
    background: #7c3aed;
    top: -170px;
    left: 8%;
}

.cp-orb-two {
    width: 300px;
    height: 300px;
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

.cp-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 32px;
    animation: cpFadeUp .6s ease both;
}

.cp-back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    margin-bottom: 24px;
    border: 1px solid rgba(167,139,250,.2);
    border-radius: 10px;
    background: rgba(30,41,70,.55);
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
    width: 59px;
    height: 59px;
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

.up-heading-symbol {
    font-size: 27px;
    font-weight: 800;
    color: #ddd6fe;
}

.cp-label {
    color: #a78bfa;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 3px;
    margin: 0 0 6px;
}

.cp-heading {
    font-size: clamp(27px, 3vw, 36px);
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
    background: rgba(30,41,70,.45);
    font-size: 12px;
    font-weight: 700;
    transition: .3s ease;
}

.cp-header-tag:hover {
    background: rgba(139,92,246,.15);
    transform: translateY(-3px);
}

.cp-form {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    animation: cpFadeUp .7s ease both;
}

.cp-section {
    position: relative;
    overflow: hidden;
    padding: 28px;
    margin-bottom: 24px;
    border: 1px solid rgba(148,163,184,.14);
    border-radius: 20px;
    background: rgba(15,23,42,.68);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 10px 35px rgba(0,0,0,.16);
    transition: border-color .3s ease, box-shadow .3s ease, transform .3s ease;
}

.cp-section:hover {
    border-color: rgba(167,139,250,.3);
    box-shadow: 0 14px 40px rgba(0,0,0,.23);
}

.cp-section-heading {
    display: flex;
    align-items: center;
    gap: 14px;
    padding-bottom: 21px;
    margin-bottom: 25px;
    border-bottom: 1px solid rgba(148,163,184,.12);
}

.cp-section-icon {
    width: 45px;
    height: 45px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    color: #c4b5fd;
    border-radius: 13px;
    background: rgba(139,92,246,.17);
    border: 1px solid rgba(167,139,250,.2);
    font-size: 19px;
    transition: .3s ease;
}

.cp-section:hover .cp-section-icon {
    transform: scale(1.06) rotate(-4deg);
    background: rgba(139,92,246,.25);
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

.cp-fields-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 25px;
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
.cp-field textarea,
.cp-field select {
    width: 100%;
    min-width: 0;
    padding: 13px 15px;
    border: 1px solid rgba(148,163,184,.2);
    border-radius: 11px;
    outline: none;
    background: rgba(30,41,70,.65);
    color: #f1f5f9 !important;
    caret-color: #a78bfa;
    font-family: inherit;
    font-size: 13px;
    transition: border-color .25s ease, box-shadow .25s ease, background .25s ease;
}

.cp-field input,
.cp-field select {
    height: 48px;
}

.cp-field textarea {
    resize: vertical;
    min-height: 125px;
    line-height: 1.7;
}

.cp-field input::placeholder,
.cp-field textarea::placeholder {
    color: #64748b;
}

.cp-field input:focus,
.cp-field textarea:focus,
.cp-field select:focus {
    border-color: #8b5cf6;
    background: rgba(49,46,129,.25);
    color: white !important;
    box-shadow: 0 0 0 3px rgba(139,92,246,.13);
}

.cp-field input:-webkit-autofill {
    -webkit-text-fill-color: #f1f5f9;
    transition: background-color 5000s ease-in-out 0s;
}

.cp-field select {
    cursor: pointer;
    color-scheme: dark;
}

.cp-field select option {
    background: #172036;
    color: white;
}

.cp-field input[type="number"] {
    color-scheme: dark;
}

.cp-price-preview {
    display: flex;
    flex-direction: column;
    align-self: stretch;
    justify-content: center;
    gap: 7px;
    min-height: 100%;
    padding: 18px;
    border: 1px solid rgba(167,139,250,.22);
    border-radius: 13px;
    background: linear-gradient(
        115deg,
        rgba(124,58,237,.15),
        rgba(37,99,235,.11)
    );
    transition: .3s ease;
}

.cp-price-preview:hover {
    border-color: rgba(167,139,250,.5);
    transform: translateY(-2px);
}

.cp-price-preview span {
    color: #a5b4fc;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .5px;
}

.cp-price-preview strong {
    color: #e9d5ff;
    font-size: 25px;
    font-weight: 800;
}

.cp-price-preview small {
    color: #94a3b8;
    font-size: 10px;
}

.cp-upload-area {
    width: 100%;
}

.cp-upload-box {
    min-height: 220px;
    padding: 32px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 13px;
    text-align: center;
    cursor: pointer;
    border: 1px dashed rgba(167,139,250,.4);
    border-radius: 16px;
    background: rgba(49,46,129,.09);
    transition: .3s ease;
}

.cp-upload-box:hover {
    border-color: #a78bfa;
    background: rgba(124,58,237,.15);
    transform: translateY(-3px);
}

.cp-upload-icon {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border-radius: 17px;
    background: rgba(139,92,246,.19);
    color: #c4b5fd;
    transition: .3s ease;
}

.cp-upload-box:hover .cp-upload-icon {
    transform: translateY(-5px);
}

.up-upload-symbol {
    font-size: 30px;
    font-weight: 700;
}

.cp-upload-box h3 {
    margin: 0;
    color: #e2e8f0;
    font-size: 16px;
}

.cp-upload-box p {
    margin: 0;
    color: #94a3b8;
    font-size: 12px;
}

.cp-upload-box > span {
    color: #64748b;
    font-size: 10px;
}

.cp-preview-container {
    display: flex;
    align-items: center;
    gap: 26px;
    min-height: 185px;
    padding: 22px;
    border: 1px solid rgba(167,139,250,.25);
    border-radius: 16px;
    background: linear-gradient(
        135deg,
        rgba(30,41,70,.65),
        rgba(49,46,129,.15)
    );
    animation: cpFadeUp .4s ease both;
    transition: .3s ease;
}

.cp-preview-container:hover {
    border-color: rgba(167,139,250,.45);
}

.cp-preview-image {
    width: 175px;
    height: 155px;
    flex-shrink: 0;
    overflow: hidden;
    border: 1px solid rgba(167,139,250,.2);
    border-radius: 13px;
    background: rgba(15,23,42,.8);
}

.cp-preview-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform .4s ease;
}

.cp-preview-image:hover img {
    transform: scale(1.06);
}

.cp-preview-details {
    min-width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
}

.cp-preview-details h3 {
    margin: 0 0 8px;
    color: #c4b5fd;
    font-size: 16px;
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

.cp-change-image {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 11px 16px;
    border-radius: 10px;
    cursor: pointer;
    color: #ddd6fe;
    background: rgba(139,92,246,.18);
    border: 1px solid rgba(167,139,250,.3);
    font-size: 12px;
    font-weight: 700;
    transition: .25s ease;
}

.cp-change-image:hover {
    background: rgba(139,92,246,.3);
    transform: translateY(-2px);
}

.cp-change-image input {
    display: none;
}

.cp-form-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    gap: 13px;
    padding: 20px 0;
}

.cp-cancel-btn,
.cp-submit-btn {
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 22px;
    border-radius: 11px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: .3s ease;
}

.cp-cancel-btn {
    color: #cbd5e1;
    background: rgba(30,41,70,.55);
    border: 1px solid rgba(148,163,184,.2);
}

.cp-cancel-btn:hover:not(:disabled) {
    background: rgba(71,85,105,.4);
    border-color: rgba(148,163,184,.4);
    transform: translateY(-3px);
}

.cp-submit-btn {
    min-width: 165px;
    color: white;
    background: linear-gradient(
        110deg,
        #7c3aed,
        #6366f1,
        #9333ea
    );
    border: 1px solid rgba(167,139,250,.3);
    box-shadow: 0 7px 22px rgba(124,58,237,.24);
}

.cp-submit-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(124,58,237,.4);
}

.cp-submit-btn:disabled,
.cp-cancel-btn:disabled {
    opacity: .55;
    cursor: not-allowed;
}

.up-loading {
    min-height: 65vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    text-align: center;
    animation: cpFadeUp .5s ease both;
}

.up-loading h3 {
    color: #e2e8f0;
    font-size: 19px;
    margin: 8px 0 0;
}

.up-loading p {
    color: #94a3b8;
    font-size: 12px;
}

.up-loader,
.up-button-loader {
    border: 3px solid rgba(167,139,250,.2);
    border-top-color: #a78bfa;
    border-radius: 50%;
    animation: cpSpin .8s linear infinite;
}

.up-loader {
    width: 45px;
    height: 45px;
}

.up-button-loader {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-width: 2px;
    border-top-color: white;
    flex-shrink: 0;
    vertical-align: middle;
}

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

@media(max-width: 1000px) {
    .cp-page {
        padding: 25px 22px 35px;
    }

    .cp-section {
        padding: 24px;
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
        width: 48px;
        height: 48px;
    }

    .cp-header-tag {
        display: none;
    }

    .cp-fields-grid {
        grid-template-columns: 1fr;
    }

    .cp-full {
        grid-column: auto;
    }

    .cp-section {
        padding: 20px;
    }

    .cp-section-heading h2 {
        font-size: 15px;
    }

    .cp-preview-container {
        flex-direction: column;
        align-items: stretch;
        padding: 18px;
    }

    .cp-preview-image {
        width: 100%;
        height: 210px;
    }

    .cp-preview-details {
        width: 100%;
    }

    .cp-price-preview {
        min-height: 100px;
    }

    .cp-form-actions {
        justify-content: stretch;
    }

    .cp-cancel-btn,
    .cp-submit-btn {
        flex: 1;
        padding: 0 12px;
    }
}

@media(max-width: 420px) {
    .cp-form-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .cp-submit-btn {
        grid-column: 1 / -1;
    }

    .cp-heading {
        font-size: 25px;
    }
}

@media(prefers-reduced-motion: reduce) {
    .cp-orb,
    .cp-header,
    .cp-form,
    .up-loading,
    .up-loader,
    .up-button-loader {
        animation: none !important;
    }

    .cp-page *,
    .cp-page *::before,
    .cp-page *::after {
        transition: none !important;
    }
}

`;

function UpdateProduct() {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        discountPercentage: "",
        stock: "",
        category: "",
        brand: ""
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await fetch(
                    `http://localhost:8000/api/v1/product/products/${productId}`,
                    {
                        method: "GET",
                        credentials: "include"
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to get Product!"
                    );
                }

                const fetchedProduct = data.data;

                setProduct({
                    name: fetchedProduct.name ?? "",
                    description: fetchedProduct.description ?? "",
                    price: fetchedProduct.price ?? "",
                    discountPercentage:
                        fetchedProduct.discountPercentage ?? "",
                    stock: fetchedProduct.stock ?? "",
                    category: fetchedProduct.category ?? "",
                    brand: fetchedProduct.brand ?? ""
                });

                setImagePreview(fetchedProduct.image ?? "");

            } catch (error) {

                console.error("Fetch Error:", error);
                alert(error.message);

            } finally {

                setFetching(false);

            }

        };

        fetchProduct();

    }, [productId]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));

    };

    const handleImageChange = (e) => {

        const file = e.target.files?.[0];

        if (file) {

            setImage(file);
            setImagePreview(URL.createObjectURL(file));

        }

    };

    useEffect(() => {

        return () => {

            if (imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }

        };

    }, [imagePreview]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const formData = new FormData();

            Object.entries(product).forEach(([key, value]) => {

                formData.append(key, value);

            });

            if (image) {
                formData.append("image", image);
            }

            const response = await fetch(
                `http://localhost:8000/api/v1/product/products/edit/${productId}`,
                {
                    method: "PATCH",
                    credentials: "include",
                    body: formData
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to update Product!"
                );
            }

            alert(result.message || "Product updated successfully!");

            navigate("/admin/product-managment");

        } catch (error) {

            console.error("Update Error:", error);
            alert(error.message);

        } finally {

            setLoading(false);

        }

    };

    if (fetching) {

        return (
            <>
                <style>{UpdateProductStyles}</style>

                <div className="cp-page">

                    <div className="cp-atmosphere">
                        <div className="cp-orb cp-orb-one"></div>
                        <div className="cp-orb cp-orb-two"></div>
                        <div className="cp-grid-bg"></div>
                    </div>

                    <div className="up-loading">
                        <div className="up-loader"></div>
                        <h3>Loading Product Details</h3>
                        <p>Please wait while we retrieve your product...</p>
                    </div>

                </div>
            </>
        );

    }

    return (

        <>
            <style>{UpdateProductStyles}</style>

            <div className="cp-page">

                <div className="cp-atmosphere">
                    <div className="cp-orb cp-orb-one"></div>
                    <div className="cp-orb cp-orb-two"></div>
                    <div className="cp-grid-bg"></div>
                </div>

                <div className="cp-header">

                    <div>

                        <button
                            type="button"
                            className="cp-back-btn"
                            onClick={() =>
                                navigate("/admin/product-managment")
                            }
                        >
                            ← Back to Products
                        </button>

                        <div className="cp-heading-row">

                            <div className="cp-heading-icon">
                                <span className="up-heading-symbol">✎</span>
                            </div>

                            <div>

                                <p className="cp-label">
                                    PRODUCT MANAGEMENT
                                </p>

                                <h1 className="cp-heading">
                                    Update Product
                                </h1>

                                <p className="cp-subtitle">
                                    Modify your product information and keep
                                    your store up to date.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="cp-header-tag">
                        <span>✦</span>
                        Edit Existing Product
                    </div>

                </div>

                <form
                    className="cp-form"
                    onSubmit={handleSubmit}
                >

                    <section className="cp-section">

                        <div className="cp-section-heading">

                            <div className="cp-section-icon">
                                <span>▤</span>
                            </div>

                            <div>
                                <h2>Product Information</h2>
                                <p>Update the basic details of your product.</p>
                            </div>

                        </div>

                        <div className="cp-fields-grid">

                            <div className="cp-field cp-full">

                                <label>
                                    Product Name <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    required
                                />

                            </div>

                            <div className="cp-field cp-full">

                                <label>
                                    Product Description <span>*</span>
                                </label>

                                <textarea
                                    name="description"
                                    value={product.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product..."
                                    required
                                />

                            </div>

                            <div className="cp-field">

                                <label>
                                    Category <span>*</span>
                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    placeholder="Enter category"
                                    required
                                />

                            </div>

                            <div className="cp-field">

                                <label>
                                    Brand
                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    value={product.brand}
                                    onChange={handleChange}
                                    placeholder="Enter brand name"
                                />

                            </div>

                        </div>

                    </section>

                    <section className="cp-section">

                        <div className="cp-section-heading">

                            <div className="cp-section-icon">
                                <span>₹</span>
                            </div>

                            <div>
                                <h2>Pricing & Inventory</h2>
                                <p>Manage product pricing, discounts and stock.</p>
                            </div>

                        </div>

                        <div className="cp-fields-grid">

                            <div className="cp-field">

                                <label>
                                    Product Price (₹) <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    min="0"
                                    required
                                />

                            </div>

                            <div className="cp-field">

                                <label>
                                    Discount Percentage (%)
                                </label>

                                <input
                                    type="number"
                                    name="discountPercentage"
                                    value={product.discountPercentage}
                                    onChange={handleChange}
                                    placeholder="Enter discount"
                                    min="0"
                                    max="100"
                                />

                            </div>

                            <div className="cp-field">

                                <label>
                                    Available Stock <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    placeholder="Enter stock quantity"
                                    min="0"
                                    required
                                />

                            </div>

                            <div className="cp-price-preview">

                                <span>Current Product Price</span>

                                <strong>
                                    ₹{product.price !== "" &&
                                    Number.isFinite(Number(product.price))
                                        ? (
                                            Number(product.price) *
                                            (1 - Number(product.discountPercentage || 0) / 100)
                                        ).toFixed(2).toLocaleString("en-IN") : "0.00"}
                                </strong>

                                <small>
                                    Updated price will reflect after saving.
                                </small>

                            </div>

                        </div>

                    </section>

                    <section className="cp-section">

                        <div className="cp-section-heading">

                            <div className="cp-section-icon">
                                <span>▧</span>
                            </div>

                            <div>
                                <h2>Product Image</h2>
                                <p>View your current image or upload a replacement.</p>
                            </div>

                        </div>

                        <div className="cp-upload-area">

                            {imagePreview ? (

                                <div className="cp-preview-container">

                                    <div className="cp-preview-image">

                                        <img
                                            src={imagePreview}
                                            alt="Product Preview"
                                        />

                                    </div>

                                    <div className="cp-preview-details">

                                        <h3>Product Image Preview</h3>

                                        <p>
                                            {image
                                                ? image.name
                                                : "Current product image"}
                                        </p>

                                        <div>
                                            <span>
                                                {image
                                                    ? "New image selected"
                                                    : "Existing image"}
                                            </span>
                                        </div>

                                        <div className="cp-preview-actions">

                                            <label className="cp-change-image">

                                                ✎ Change Image

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    hidden
                                                />

                                            </label>

                                        </div>

                                    </div>

                                </div>

                            ) : (

                                <label className="cp-upload-box">

                                    <div className="cp-upload-icon">
                                        <span className="up-upload-symbol">↑</span>
                                    </div>

                                    <h3>Upload Product Image</h3>

                                    <p>
                                        Click here to select an image
                                    </p>

                                    <span>
                                        PNG, JPG, JPEG or WEBP
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />

                                </label>

                            )}

                        </div>

                    </section>

                    <div className="cp-form-actions">

                        <button
                            type="button"
                            className="cp-cancel-btn"
                            onClick={() =>
                                navigate("/admin/product-managment")
                            }
                            disabled={loading}
                        >
                            ← Cancel
                        </button>

                        <button
                            type="submit"
                            className="cp-submit-btn"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="up-button-loader"></span>
                                    Updating Product...
                                </>
                            ) : (
                                <>
                                    <span>✓</span>
                                    Save Changes
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </>

    );

}

export default UpdateProduct;
