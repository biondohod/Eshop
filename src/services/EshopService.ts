import useHttp from "../hooks/http.hook.ts";

const API_BASE: string = 'https://api.escuelajs.co/api/v1/';

const useEshopService = () => {
    const {request, loading, error} = useHttp();
    const getAllCategories = async () => {
        return await request(`${API_BASE}categories`);
    }

    const getAllItems = async () => {
        return await request(`${API_BASE}products`);
    }

    const getCategoryItems = async (categoryId: number) => {
        return await request(`${API_BASE}categories/${categoryId}/products`);
    }

    const getSingleItem = async (itemId: number) => {
        return await request(`${API_BASE}products/${itemId}`);
    }

    function smoothScrollToTop(duration: number): void {
        const targetPosition: number = 0;
        const startPosition: number = window.pageYOffset;
        const distance: number = targetPosition - startPosition;
        let startTime: number | null = null;

        function animation(currentTime: number): void {
            if (startTime === null) startTime = currentTime;
            const timeElapsed: number = currentTime - startTime;
            const run: number = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t: number, b: number, c: number, d: number): number {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    const getLocalStorageArray = <T>(key: string): T[] => {
        const storedData: string | null = localStorage.getItem(key);
        if (storedData) {
            try {
                return JSON.parse(storedData);
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
            }
        }
        return [];
    };

    return {loading, error, getAllCategories, getAllItems, getCategoryItems, getSingleItem, smoothScrollToTop, getLocalStorageArray}
}

export default useEshopService;

