const mockProducts = [
  {
    id: 1,
    name: 'BMW X5',
    precio: 30000,
    image: '/assests/products/bmw-x5.jpg',
    category: 'deportivos',
    brand: 'Bmw',
    rating: 5,
    
  },
  {
    id: 2,
    name: 'Audi A4',
    precio: 40000,
    image: '/assests/products/audi-a4.jpg',
    category: 'deportivos',
    brand: 'Audi',
    rating: 4,
    
  },
  {
    id: 3,
    name: 'BMW M3',
    precio: 75000,
    image: '/assests/products/bmwM3.jpg', 
    category: 'deportivos',
    brand: 'Bmw',
    rating: 5,
    
  },
  {
    id: 4,
    name: 'Mercedes C 63 S',
    precio: 60000,
    image: '/assests/products/mercedesamgc63s.jpg',
    category: 'deportivos',
    brand: 'Mercedes',
    rating: 5,
    
  },


  {
    id: 5,
    name: 'Volkswagen Golf Gti',
    precio: 45000,
    image: '/assests/products/golfgti.jpg',
    category: 'deportivos',
    brand: 'Volkswagen',
    rating: 5,
   
  },


  {
    id: 6,
    name: 'Seat Leon Fr',
    precio: 28000,
    image: '/assests/products/seat-leon.jpg',
    category: 'deportivos',
    brand: 'Seat',
    rating: 4,
   
  },


  {
    id: 7,
    name: 'Seat Ibiza Fr',
    precio: 22000,
    image: '/assests/products/seat-ibiza.jpg',
    category: 'deportivos',
    brand: 'Seat',
    rating: 4,
   
  },


  {
    id: 8,
    name: 'Audi A1',
    precio: 30000,
    image: '/assests/products/audi-a1.jpg',
    category: 'deportivos',
    brand: 'Audi',
    rating: 4,
   
  },



  {
    id: 9,
    name: 'Hynundai i30 N',
    precio: 40000,
    image: '/assests/products/i30n.jpg',
    category: 'deportivos',
    brand: 'Hynundai',
    rating: 4,
   
  },



  {
    id: 10,
    name: 'Hyundai i20 N',
    precio: 32000,
    image: '/assests/products/i20n.jpg',
    category: 'deportivos',
    brand: 'Hynundai',
    rating: 4,
   
  },


  {
    id: 11,
    name: 'Toyota Gr Supra',
    precio: 52000,
    image: '/assests/products/toyotagr.jpg',
    category: 'deportivos',
    brand: 'Toyota',
    rating: 4,
   
  },



  {
    id: 12,
    name: 'Ford Focus Rs',
    precio: 45000,
    image: '/assests/products/Fordfocusrs.jpg',
    category: 'deportivos',
    brand: 'Ford',
    rating: 4,
   
  },


  {
    id: 13,
    name: 'Nissan Maxima',
    precio: 40000,
    image: '/assests/products/nissanmaxima.jpg',
    category: 'deportivos',
    brand: 'Nissan',
    rating: 4,
   
  },


  {
    id: 14,
    name: 'Honda Civic Type R',
    precio: 58000,
    image: '/assests/products/hondacivic.jpg',
    category: 'deportivos',
    brand: 'Honda',
    rating: 4,
   
  },


  {
    id: 15,
    name: 'Lamborghini Urus',
    precio: 232000,
    image: '/assests/products/lamborguiniurus.jpg',
    category: 'Superdeportivos',
    brand: 'Lamborghini',
    rating: 5,
   
  },


  {
    id: 16,
    name: 'Ferrari 458 italia',
    precio: 245000,
    image: '/assests/products/ferrari458italia.jpg',
    category: 'Superdeportivos',
    brand: 'Ferrari',
    rating: 5,
   
  },

  {
    id: 17,
    name: 'Opel Corsa Gs Line',
    precio: 22000,
    image: '/assests/products/opelcorsa.jpg',
    category: 'deportivos',
    brand: 'Opel',
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
