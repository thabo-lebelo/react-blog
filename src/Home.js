import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:8000/blogs`)
            .then(res => {
                if(!res.ok) {
                    throw Error('Could not fetch the data')
                }
                return res.json()
            })
            .then((data) => {
                setBlogs(data);
                setError(null);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error.message)
                setError(error.message)
                setIsLoading(false);
            })
        }, 1000)
    }, []);

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs!" />}
        </div>
    );
};

export default Home;