import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './BestCategory.css'
const categories = [
    {
        cat:'repair',
        link:'https://i.ibb.co/jk6fQsc7/service.jpg'
    },
    {
        cat : 'carwash',
        link:'https://i.ibb.co/wNW196kj/wash.jpg'
    },
    {
        cat : 'spray',
        link: 'https://i.ibb.co/HLC1N304/paint.jpg'
    },
    {
        cat : 'spare parts',
        link : 'https://i.ibb.co/4gwBXmqh/parts.jpg'
    },
    {
        cat : 'tires',
        link : 'https://i.ibb.co/yFmBGVNK/tires.jpg'
    },
    {
        cat : 'accessorize',
        link : 'https://i.ibb.co/C5fwwSyY/access.jpg'
    },
    {
        cat : 'showroom',
        link : 'https://i.ibb.co/60tgHcYR/showroom.jpg'
    },
]

const BestCategories = () => {
    const { t } = useTranslation('common')
    const router = useNavigate()
    return (
        <div className='best-categories'>
            <div className="best-categories-head">
                <h2>{t('best-categories-heading')}</h2>
                <p>{t('best-categories-p')}</p>
            </div>
            <div className="best-category-cards">
                {categories.map((category) => (
                    <div
                        key={category.cat}
                        className="best-category-card"
                        onClick={() => router(`/category/${category.cat}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="best-category-image-wrapper">
                            <img src={category.link} alt={t(category.cat)} className="best-category-image" />
                        </div>
                        <div className="best-category-title">
                            {category.cat === 'repair' ? t('repair') :
                                category.cat === 'carwash' ? t('carwash') :
                                category.cat === 'spray' ? t('spray') :
                                category.cat === 'spare parts' ? t('spare-parts') :
                                category.cat === 'tires' ? t('tires') :
                                category.cat === 'accessorize' ? t('accessorize') :
                                category.cat === 'showroom' ? t('showroom') :
                                category.cat}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BestCategories
