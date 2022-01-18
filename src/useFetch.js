import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data')
                    }
                    return res.json()
                })
                .then((data) => {
                    setData(data);
                    setError(null);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error.message)
                    setError(error.message)
                    setIsLoading(false);
                })
        }, 1000)
    }, [url]);

    return { data, isLoading, error }
}

export default useFetch;