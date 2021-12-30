import axios from "axios";
import {useEffect, useState} from "react";

const NewsFeed = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {

        const options = {
            method: 'GET',
            url: 'https://crypto-news-live.p.rapidapi.com/news',
            headers: {
                'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            // console.log(response.data);
            setArticles(response.data);

        }).catch((error) => {
            console.error(error);
        });
    }, [])

    // console.log(articles);

    const article = articles.map((article) => {
        return (
            <div className="article">

                <a target="_blank" rel="noreferrer" href={article.url}><h3>{article.title}</h3></a>
            </div>
        )
    })

    return (
        <div className="news-feed">
            <h2>News Feed</h2>
            <h2>Here are some of the latest news articles from the crypto-news-live API</h2>

            <p>{article}</p>
        </div>
    )
}

export default NewsFeed;