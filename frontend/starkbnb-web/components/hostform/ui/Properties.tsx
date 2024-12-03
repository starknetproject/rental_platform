import React from 'react';
import Card from './Card';


const Properties = () => {
  const cards = [
    {
        title: 'image',
        imageUrl: '/images/bg.png',
        rating: '5.0',
        city: "Okpanam, Asaba",
        country: 'Nigeria',
        size: '2,500 sq ft',
        amount: '2.5 ETH / Month',
    },
    {
        title: 'image',
        imageUrl: '/images/bg.png',
        rating: '5.0',
        city: "Okpanam, Asaba",
        country: 'Nigeria',
        size: '2,500 sq ft',
        amount: '2.5 ETH / Month',
    },
    {
        title: 'image',
        imageUrl: '/images/bg.png',
        rating: '5.0',
        city: "Okpanam, Asaba",
        country: 'Nigeria',
        size: '2,500 sq ft',
        amount: '2.5 ETH / Month',
    },
    {
        title: 'image',
        imageUrl: '/images/bg.png',
        rating: '5.0',
        city: "Okpanam, Asaba",
        country: 'Nigeria',
        size: '2,500 sq ft',
        amount: '2.5 ETH / Month',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 mt-4'>
      {
        cards.map((card, index) => (
          <Card
          key={index}
          title= {card.title}
          imageUrl= {card.imageUrl}
          rating= {card.rating}
          city= {card.city}
          country= {card.country}
          size= {card.size}
          amount= {card.amount}
        /> 
        ))
      }
      {/* <Card
        title= 'image'
        imageUrl= '/images/bg.png'
        rating= '5.0'
        city= "Okpanam, Asaba"
        country= 'Nigeria'
        size= '2,500 sq ft'
        amount= '2.5 ETH / Month'
      /> */}

    </div>
  )
}

export default Properties
