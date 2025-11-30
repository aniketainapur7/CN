import { Link } from 'react-router-dom';
import { BookOpen, Truck, Shield, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredBooks = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 24.99,
      image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 27.99,
      image: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
    },
    {
      id: 3,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      price: 22.99,
      image: 'https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
    },
    {
      id: 4,
      title: 'Educated',
      author: 'Tara Westover',
      price: 26.99,
      image: 'https://images.pexels.com/photos/1301585/pexels-photo-1301585.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
    },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next
              <br />
              Great Read
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-50 leading-relaxed">
              Explore thousands of books across all genres. From bestsellers to hidden gems,
              find your perfect story today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/catalogue"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl group"
              >
                Browse Catalogue
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-all"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <Truck className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Free Shipping</h3>
            <p className="text-gray-600">
              Enjoy free delivery on all orders over $50. Fast and reliable shipping worldwide.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <Shield className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Payments</h3>
            <p className="text-gray-600">
              Shop with confidence. All transactions are encrypted and completely secure.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-amber-100 p-4 rounded-full mb-4">
              <BookOpen className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Vast Selection</h3>
            <p className="text-gray-600">
              Access to millions of titles across all genres, languages, and formats.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Books</h2>
            <p className="text-gray-600">Handpicked selections from our collection</p>
          </div>
          <Link
            to="/catalogue"
            className="hidden sm:flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-colors group"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-5">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold text-gray-700 ml-1">{book.rating}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-600">${book.price}</span>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/catalogue"
          className="sm:hidden flex items-center justify-center mt-8 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
        >
          View All Books
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>

      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Reading Community</h2>
            <p className="text-xl text-amber-50 mb-8">
              Get exclusive access to new releases, special discounts, and personalized recommendations.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
