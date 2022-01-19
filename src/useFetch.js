import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
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
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        setError(error.message)
                        setIsLoading(false);
                    }
                })
        }, 1000);

        return () => abortCont.abort();

    }, [url]);

    return { data, isLoading, error }
}

export default useFetch;