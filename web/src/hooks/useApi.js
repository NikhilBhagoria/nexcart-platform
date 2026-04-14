import { useState, useCallback } from 'react';

/**
 * A custom hook for making API requests from the frontend.
 * It manages loading, data, and error states automatically.
 */
export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Default headers
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      };

      const fetchOptions = {
        ...options,
        headers,
      };

      // Stringify body if it's an object
      if (options.body && typeof options.body === 'object') {
        fetchOptions.body = JSON.stringify(options.body);
      } else if (options.body) {
        fetchOptions.body = options.body;
      }

      // Add a base API url prefix if NEXT_PUBLIC_API_URL is defined and the URL is relative
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;

      const response = await fetch(fullUrl, fetchOptions);

      // Attempt to parse JSON response or fallback to text/null
      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        const errorMessage = typeof responseData === 'object' && responseData?.message 
          ? responseData.message 
          : `API Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      setData(responseData);
      return responseData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, request, reset };
}
