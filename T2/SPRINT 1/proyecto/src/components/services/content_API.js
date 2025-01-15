const mockProducts = [
  {
    id: 1,
    name: 'BMW X5',
    price: 30000,
    image: '/assests/products/bmw-x5.jpg',
    category: 'deportivos',
    brand: 'Bmw',
    rating: 5,
    
  },
  {
    id: 2,
    name: 'Audi A4',
    price: 25000,
    image: '/assests/products/audi-a4.jpg',
    category: 'deportivos',
    brand: 'Audi',
    rating: 4,
    
  },
  {
    id: 3,
    name: 'BMW M3',
    price: 75000,
    image: '/assests/products/bmwM3.jpg', 
    category: 'deportivos',
    brand: 'Bmw',
    rating: 5,
    
  },
  {
    id: 4,
    name: 'Mercedes C 63 S',
    price: 60000,
    image: '/assests/products/mercedesamgc63s.jpg',
    category: 'deportivos',
    brand: 'Mercedes',
    rating: 5,
    
  },


  {
    id: 5,
    name: 'Volkswagen Golf Gti',
    price: 45000,
    image: '/assests/products/golfgti.jpg',
    category: 'deportivos',
    brand: 'Volkswagen',
    rating: 5,
   
  },


  {
    id: 6,
    name: 'Seat Leon Fr',
    price: 28000,
    image: '/assests/products/seat-leon.jpg',
    category: 'deportivos',
    brand: 'Seat',
    rating: 4,
   
  },


  {
    id: 7,
    name: 'Seat Ibiza Fr',
    price: 22000,
    image: '/assests/products/seat-ibiza.jpg',
    category: 'deportivos',
    brand: 'Seat',
    rating: 4,
   
  },


  {
    id: 8,
    name: 'Audi A1',
    price: 30000,
    image: '/assests/products/audi-a1.jpg',
    category: 'deportivos',
    brand: 'Audi',
    rating: 4,
   
  },



  {
    id: 9,
    name: 'Hynundai i30 N',
    price: 40000,
    image: '/assests/products/i30n.jpg',
    category: 'deportivos',
    brand: 'Hynundai',
    rating: 4,
   
  },



  {
    id: 10,
    name: 'Hyundai i20 N',
    price: 32000,
    image: '/assests/products/i20n.jpg',
    category: 'deportivos',
    brand: 'Hynundai',
    rating: 4,
   
  },








];

export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};
