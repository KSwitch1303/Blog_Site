import { useEffect, useState } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    // console.log(res);
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json()
                })
                .then(data =>   {
                    setData(data)
                    setIsPending(false)
                    setError(null);
                    // console.log(blogs);
                })
                .catch(err => {
                    if (err === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsPending(false)
                        setError(err.message);
                    }                    
                })
        }, 1000);
        // * ABORT AND CLEANUP FUNCTION
        return () => abortCont.abort;
    }, [url])  

    return { data, isPending, error }
}

export default useFetch