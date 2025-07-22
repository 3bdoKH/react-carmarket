import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import React from 'react';
import '../styles/blog.css';
import { Link } from 'react-router-dom';

const BlogCard = ({heading, paragraph, imgLink, date, blog} : {heading : string, paragraph : string, imgLink : string, date : string, blog : string}) => {
    return (
        <Link to={`/blog/${blog}`} className='blog-card'>
            <div className="image">
                <img src={imgLink} alt={heading} />
            </div>
            <div className="description">
                <span>{date}</span>
                <h2>{heading}</h2>
                <p>{paragraph}</p>
            </div>
        </Link>
    );
};

const Blog = () => {
    return (
        <>
            <Header onSearch={() => {}} search={false} />
            <div className="blog">
                <BlogCard heading='ما هي أفضل لمبات LED سيارات في مصر ؟' paragraph='بمقارنة واضحة تعرف على أفضل لمبات ليد للسيارات تباع في السوق المصري، وتعرف على نقاط قوة وضعف كل اللمبات المتميزة.' imgLink='https://i.ibb.co/V0XJZKVc/Best-Car-LED-Bulbs.webp' date='19 / 7 / 2025' blog='led'   />
            </div>
            <Footer />
        </>
    );
};

export default Blog; 