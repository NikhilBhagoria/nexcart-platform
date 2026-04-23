const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetches all products from the backend API.
 * Uses cache: 'no-store' to ensure fresh data during development SSR.
 * 
 * @returns {Promise<Object>} The API response { success, data }
 */
export async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`, {
            cache: 'no-store', // Disable cache for MVP development
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return { success: false, data: [] };
    }
}

/**
 * Fetches a single product by ID from the backend API.
 * 
 * @param {string} id The product UUID
 * @returns {Promise<Object>} The API response { success, data }
 */
export async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            cache: 'no-store',
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
        return { success: false, data: null };
    }
}
