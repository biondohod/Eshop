const API_BASE: string = 'https://api.escuelajs.co/api/v1/';

export const getAllCategories = async () => {
    const response = await fetch(`${API_BASE}categories`);
    return await response.json();
}

export const getAllItems = async () => {
    const response = await fetch(`${API_BASE}products`);
    return await response.json();
}

export const getCategoryItems = async (categoryId: number) => {
    const response = await fetch(`${API_BASE}categories/${categoryId}/products`);
    return await response.json();
}

export const getSingleItem = async (itemId: number) => {
    const response = await fetch(`${API_BASE}products/${itemId}`);
    return await response.json();
}

export function smoothScrollToTop(duration: number): void {
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

export const getLocalStorageArray = <T>(key: string): T[] => {
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



// export const debounce = (func: Function, wait: number, immediate: boolean) => {
//     let timeout: number | null;
//     return function executedFunction() {
//         const context = this;
//         const args = arguments;
//
//         const later = () => {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//
//         const callNow: boolean = immediate && !timeout;
//         clearTimeout(timeout as number);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// }
