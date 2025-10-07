import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../data/blogPosts';

const BlogDetails = () => {
    const { blog } = useParams();
    const post = getPostBySlug(blog);

    return (
        <>
            <Header onSearch={() => {}} search={false} />
            <div className="led-blog-container">
                {post ? post.render() : (
                    <h1 className="led-blog-main-title">المقالة غير موجودة</h1>
                )}
            </div>
            <Footer />
        </>
    );
};

export default BlogDetails;