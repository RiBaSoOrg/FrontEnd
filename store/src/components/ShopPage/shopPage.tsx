import './ShopPage.css';
import BooksList from "../BooksList/BooksList";
import { useState } from 'react';

const ShopPage: React.FC = () => {
    const [likes, setLikes] = useState<{ [key: string]: number }>({});
    const [currentPage, setCurrentPage] = useState(1);

    const handleLikeClick = (bookId: string) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [bookId]: (prevLikes[bookId] || 0) + 1,
        }));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="shop-container">
            <BooksList
                minpage={0}
                maxpage={999999}
                backgroundClass="shop-background"
                initialPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ShopPage;
