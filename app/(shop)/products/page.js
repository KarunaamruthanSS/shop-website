"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../../lib/cartContext";
import { useTranslation } from "../../../lib/translationContext";
import { useToast } from "../../../lib/toastContext";
import { useSession } from "../../../lib/sessionContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const { user } = useSession();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (res.ok) {
        setProducts(data.products);
        // Extract unique categories
        const uniqueCategories = [...new Set(data.products.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } else {
        setError(data.error || "Failed to fetch products");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "stock":
          return b.stock - a.stock;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (product) => {
    try {
      if (user) {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include',
          body: JSON.stringify({ productId: product.id })
        });

        if (res.ok) {
          showSuccess(t('Product added to cart!'));
        } else {
          const data = await res.json();
          showError(data.error || "Failed to add to cart");
        }
      } else {
        addToCart(product);
        showSuccess(t('Product added to cart!'));
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError("Network error");
    }
  };

  if (loading) {
    return (
      <main style={{ padding: 20 }}>
        <h2>{t('Products')}</h2>
        <p>{t('Loading')}...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main style={{ padding: 20 }}>
        <h2>{t('Products')}</h2>
        <div style={{ color: "red", padding: 10, border: "1px solid red", borderRadius: 4 }}>
          {error}
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="products-page">
        <div className="products-header">
          <h2 className="products-title">{t('Products')} ({filteredProducts.length})</h2>
          
          {/* Search and Filter Controls */}
          <div className="filters-container">
            {/* Search */}
            <div className="filter-group">
              <label className="filter-label">{t('Search Products')}:</label>
              <input
                type="text"
                placeholder={t('Search by name or description...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </div>

            {/* Category and Sort in mobile row */}
            <div className="filter-row">
              {/* Category Filter */}
              <div className="filter-group">
                <label className="filter-label">{t('Category')}:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                >
                  <option value="">{t('All Categories')}</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="filter-group">
                <label className="filter-label">{t('Sort By')}:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="name">{t('Name (A-Z)')}</option>
                  <option value="price-low">{t('Price (Low to High)')}</option>
                  <option value="price-high">{t('Price (High to Low)')}</option>
                  <option value="stock">{t('Stock (High to Low)')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory) && (
            <div className="clear-filters">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="btn btn-clear"
              >
                {t('Clear Filters')}
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.imageUrl && (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="product-image"
                  />
                )}
                
                <h3 className="product-name">{product.name}</h3>
                
                {product.description && (
                  <p className="product-description">
                    {product.description}
                  </p>
                )}

                <div className="product-price-row">
                  <span className="product-price">₹{product.price}</span>
                  {product.category && (
                    <span className="product-category">{product.category}</span>
                  )}
                </div>

                <div className="product-stock">
                  <span className={`stock-text ${product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}`}>
                    {product.stock > 0 ? `${product.stock} ${t('in stock')}` : t('Out of Stock')}
                  </span>
                </div>

                <div className="product-actions">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`btn btn-add-cart ${product.stock === 0 ? 'disabled' : ''}`}
                  >
                    {product.stock === 0 ? t('Out of Stock') : t('Add to Cart')}
                  </button>
                  
                  <Link href={`/products/${product.id}`}>
                    <button className="btn btn-view-details">
                      {t('View Details')}
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>{t('No products found')}</h3>
            <p>{t('Try adjusting your search or filter criteria.')}</p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                }}
                className="btn btn-show-all"
              >
                {t('Show All Products')}
              </button>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        .products-page {
          padding: 15px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .products-header {
          margin-bottom: 25px;
        }

        .products-title {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #333;
        }

        .filters-container {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
          margin-bottom: 15px;
        }

        .filter-group {
          margin-bottom: 15px;
        }

        .filter-group:last-child {
          margin-bottom: 0;
        }

        .filter-label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          font-size: 14px;
          color: #333;
        }

        .filter-input,
        .filter-select {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 16px;
        }

        .filter-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .clear-filters {
          margin-top: 15px;
        }

        .btn {
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          font-weight: bold;
        }

        .btn-clear {
          background-color: #6c757d;
          color: white;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
        }

        .product-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        .product-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .product-name {
          margin: 0 0 10px 0;
          font-size: 1.1rem;
          line-height: 1.3;
          color: #333;
        }

        .product-description {
          color: #666;
          font-size: 13px;
          margin-bottom: 10px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-price-row {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 5px;
        }

        .product-price {
          font-size: 18px;
          font-weight: bold;
          color: #007bff;
        }

        .product-category {
          padding: 2px 6px;
          background-color: #e9ecef;
          border-radius: 4px;
          font-size: 11px;
          color: #495057;
        }

        .product-stock {
          margin-bottom: 15px;
        }

        .stock-text {
          font-size: 13px;
          font-weight: bold;
        }

        .stock-text.in-stock {
          color: #28a745;
        }

        .stock-text.low-stock {
          color: #ffc107;
        }

        .stock-text.out-of-stock {
          color: #dc3545;
        }

        .product-actions {
          display: flex;
          gap: 8px;
        }

        .btn-add-cart {
          flex: 1;
          background-color: #28a745;
          color: white;
        }

        .btn-add-cart.disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .btn-view-details {
          background-color: #007bff;
          color: white;
          min-width: 100px;
        }

        .no-products {
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }

        .no-products h3 {
          margin-bottom: 10px;
          color: #333;
        }

        .no-products p {
          margin-bottom: 20px;
        }

        .btn-show-all {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
        }

        @media (max-width: 768px) {
          .products-page {
            padding: 10px;
          }

          .products-title {
            font-size: 1.3rem;
          }

          .filters-container {
            padding: 12px;
          }

          .filter-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .product-card {
            padding: 12px;
          }

          .product-image {
            height: 160px;
          }

          .product-actions {
            flex-direction: column;
          }

          .btn-view-details {
            min-width: auto;
          }
        }

        @media (max-width: 480px) {
          .product-price-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .product-category {
            align-self: flex-start;
          }
        }
      `}</style>
    </>
  );
}
