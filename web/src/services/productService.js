const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Fetches all products from the backend Node.js API
 * @returns {Promise<Array>} Array of product objects
 */
export async function getAllProducts() {
    try {
        const response = await fetch(`${API_URL}/products`, {
            // Revalidate cache every 60 seconds (Next.js specific optimization)
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const json = await response.json();
        
        // Return the data array directly, skipping the wrapper
        return json.data || []; 
    } catch (error) {
        console.error("Error in getAllProducts service:", error);
        return []; // Return empty array on failure
    }
}

/**
 * Fetches a single product by ID
 * @param {string} id - The product ID
 * @returns {Promise<Object|null>} Product object or null
 */
export async function getProductById(id) {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            next: { revalidate: 60 },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Failed to fetch product ${id}: ${response.status}`);
        }
        
        const json = await response.json();
        return json.data || null;
    } catch (error) {
        console.error(`Error in getProductById service for ${id}:`, error);
        return null;
    }
}
