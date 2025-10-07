import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import SEO from '../components/seo/SEO';
import { useTranslation } from 'react-i18next';
import '../styles/blog.css';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

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
		blogPost: blogPosts.map(p => ({
			'@type': 'BlogPosting',
			headline: p.title,
			description: p.excerpt,
			url: `https://carmarket-eg.online/blog/${p.slug}`,
			datePublished: p.publishedAt,
			dateModified: p.updatedAt,
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
				url: p.image
			},
			mainEntityOfPage: {
				'@type': 'WebPage',
				'@id': `https://carmarket-eg.online/blog/${p.slug}`
			}
		}))
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
				{blogPosts.map(post => (
					<BlogCard key={post.slug} heading={post.title} paragraph={post.excerpt} imgLink={post.image} date={post.date} blog={post.slug} />
				))}
			</div>
            <Footer />
        </>
    );
};

export default Blog; 