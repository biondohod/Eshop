import { useState, useCallback } from "react";

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (
        url: string, 
        method: string = 'GET', 
        body?: undefined | any,
        headers?: undefined | {}) => {
        setLoading(true);
        setError(false);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                setError(true);
            }

            const data = await response.json();

            setLoading(false);

            return data;
        } catch(e) {
            setLoading(false);
            setError(true);
            throw e;
        }
    }, []);

    return {request, loading, error}
};

export default useHttp;