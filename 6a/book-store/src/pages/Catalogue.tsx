import { useState } from 'react';
import { Search, Filter, Star, Heart, ShoppingCart } from 'lucide-react';

export default function Catalogue() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'romance', name: 'Romance' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'biography', name: 'Biography' },
    { id: 'self-help', name: 'Self-Help' },
  ];

  const books = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 24.99,
      category: 'fiction',
      rating: 4.8,
      reviews: 2847,
      image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 27.99,
      category: 'self-help',
      rating: 4.9,
      reviews: 4521,
      image: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      price: 22.99,
      category: 'mystery',
      rating: 4.7,
      reviews: 3142,
      image: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      title: 'Educated',
      author: 'Tara Westover',
      price: 26.99,
      category: 'biography',
      rating: 4.9,
      reviews: 5234,
      image: 'https://images.pexels.com/photos/1301585/pexels-photo-1301585.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 5,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      price: 28.99,
      category: 'sci-fi',
      rating: 4.8,
      reviews: 3876,
      image: 'https://images.pexels.com/photos/256546/pexels-photo-256546.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 6,
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      price: 25.99,
      category: 'fiction',
      rating: 4.6,
      reviews: 6234,
      image: 'https://images.pexels.com/photos/2203683/pexels-photo-2203683.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 7,
      title: 'The Four Winds',
      author: 'Kristin Hannah',
      price: 26.99,
      category: 'fiction',
      rating: 4.7,
      reviews: 2987,
      image: 'https://images.pexels.com/photos/2099266/pexels-photo-2099266.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 8,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      price: 29.99,
      category: 'non-fiction',
      rating: 4.8,
      reviews: 4123,
      image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 9,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      price: 24.99,
      category: 'romance',
      rating: 4.9,
      reviews: 7842,
      image: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 10,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 23.99,
      category: 'fiction',
      rating: 4.7,
      reviews: 9234,
      image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 11,
      title: 'Becoming',
      author: 'Michelle Obama',
      price: 32.99,
      category: 'biography',
      rating: 4.9,
      reviews: 8765,
      image: 'https://images.pexels.com/photos/1301585/pexels-photo-1301585.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 12,
      title: 'Dune',
      author: 'Frank Herbert',
      price: 27.99,
      category: 'sci-fi',
      rating: 4.8,
      reviews: 5432,
      image: 'https://images.pexels.com/photos/256546/pexels-photo-256546.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesPrice =
      priceRange === 'all' ||
      (priceRange === 'under-25' && book.price < 25) ||
      (priceRange === '25-30' && book.price >= 25 && book.price <= 30) ||
      (priceRange === 'over-30' && book.price > 30);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Catalogue</h1>
        <p className="text-gray-600">Discover your next favorite book from our collection</p>
      </div>

      <div className="mb-8 flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
          >
            <option value="all">All Prices</option>
            <option value="under-25">Under $25</option>
            <option value="25-30">$25 - $30</option>
            <option value="over-30">Over $30</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-amber-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-amber-100 text-amber-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-amber-50 transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="h-5 w-5 text-gray-700 hover:text-red-500 transition-colors" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm font-semibold text-gray-700 ml-1">
                        {book.rating}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">({book.reviews})</span>
                    </div>
                    <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                      {categories.find((c) => c.id === book.category)?.name}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{book.author}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-600">${book.price}</span>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
