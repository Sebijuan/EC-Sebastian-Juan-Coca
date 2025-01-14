
const mockProducts = [
  {
    id: 1,
    name: 'BMW X5',
    price: 30000,
    image: '/public/assets/products/bmw-x5.jpg',
    category: 'deportivos',
    brand: 'bmw',
    rating: 5,
    color: 'negro',
  },
  {
    id: 2,
    name: 'Audi A4',
    price: 25000,
    image: '/public/assets/products/audi-a4.jpg',
    category: 'deportivos',
    brand: 'audi',
    rating: 4,
    color: 'blanco',
  },
  {
    id: 3,
    name: 'BMW M3',
    price: 75000,
    image: '/public/assets/products/bmwM3.jpg', 
    category: 'deportivos',
    brand: 'bmw',
    rating: 5,
    color: 'negro',
  },
  {
    id: 4,
    name: 'Mercedes C 63 S',
    price: 60000,
    image: '/public/assets/products/mercedesamgc63s.jpg',
    category: 'deportivos',
    brand: 'mercedes',
    rating: 5,
    color: 'negro',
  },
];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};
