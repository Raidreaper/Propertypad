import React from 'react';
import { BuildingOfficeIcon, HomeIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PropertyCardProps {
  id: string;
  name: string;
  address: string;
  units: number;
  occupancy: string;
  status: string;
  imageUrl?: string;
  images?: string[]; // Add support for multiple images
  onView: () => void;
  onDelete: () => void;
}

export default function PropertyCard({
  id,
  name,
  address,
  units,
  occupancy,
  status,
  imageUrl,
  images = [], // Default to empty array
  onView,
  onDelete,
}: PropertyCardProps) {
  // Combine single imageUrl with images array
  const allImages = imageUrl ? [imageUrl, ...images] : images;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105 border-2 border-transparent hover:border-blue-400 hover:border-dashed">
      <div className="relative h-48 bg-gradient-to-r from-blue-100 to-green-100">
        {allImages.length > 0 ? (
          <Slider {...sliderSettings}>
            {allImages.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`${name} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <BuildingOfficeIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 z-10">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800 animate-pulse'
            }`}
          >
            {status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 transition-colors duration-300 hover:text-blue-600">{name}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
          {address}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <HomeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {units} units
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {occupancy} occupied
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            type="button"
            onClick={onView}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Details
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-pink-400 hover:from-pink-400 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 