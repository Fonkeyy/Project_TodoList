export const storageService = (() => {
    const set = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const get = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };

    const remove = (key) => {
        localStorage.removeItem(key);
    };

    return { set, get, remove };
})();
