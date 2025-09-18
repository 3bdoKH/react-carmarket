import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import SEO from '../components/seo/SEO';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation('common');
    
    // SEO structured data for blog page
    const blogStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: t('seo.blog-title'),
        description: t('seo.blog-description'),
        url: 'https://carmarket-eg.online/blog',
        publisher: {
            '@type': 'Organization',
            name: 'Car Market Egypt',
            alternateName: 'كار ماركت',
            logo: {
                '@type': 'ImageObject',
                url: 'https://carmarket-eg.online/images/logo.png'
            }
        },
        blogPost: [
            {
                '@type': 'BlogPosting',
                headline: 'ما هي أفضل لمبات LED سيارات في مصر ؟',
                description: 'بمقارنة واضحة تعرف على أفضل لمبات ليد للسيارات تباع في السوق المصري، وتعرف على نقاط قوة وضعف كل اللمبات المتميزة.',
                url: 'https://carmarket-eg.online/blog/led',
                datePublished: '2025-07-19',
                dateModified: '2025-07-19',
                author: {
                    '@type': 'Organization',
                    name: 'Car Market Egypt'
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Car Market Egypt',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://carmarket-eg.online/images/logo.png'
                    }
                },
                image: {
                    '@type': 'ImageObject',
                    url: 'https://i.ibb.co/V0XJZKVc/Best-Car-LED-Bulbs.webp'
                },
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': 'https://carmarket-eg.online/blog/led'
                }
            }
        ]
    };

    return (
        <>
            <SEO 
                title={t('seo.blog-title')}
                description={t('seo.blog-description')}
                keywords={t('seo.blog-keywords', { returnObjects: true }) as string[]}
                url="https://carmarket-eg.online/blog"
                type="website"
                structuredData={blogStructuredData}
                alternateUrls={{
                    'ar': 'https://carmarket-eg.online/blog?lang=ar',
                    'en': 'https://carmarket-eg.online/blog?lang=en',
                    'x-default': 'https://carmarket-eg.online/blog'
                }}
            />
            <Header onSearch={() => {}} search={false} />
            <div className="blog">
                <BlogCard heading='ما هي أفضل لمبات LED سيارات في مصر ؟' paragraph='بمقارنة واضحة تعرف على أفضل لمبات ليد للسيارات تباع في السوق المصري، وتعرف على نقاط قوة وضعف كل اللمبات المتميزة.' imgLink='https://i.ibb.co/V0XJZKVc/Best-Car-LED-Bulbs.webp' date='19 / 7 / 2025' blog='led'   />
            </div>
            <Footer />
        </>
    );
};

export default Blog; 