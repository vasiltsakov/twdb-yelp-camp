const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60193cc335871f5b2c6af8c0',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae ratione beatae asperiores facere quis cupiditate sequi perferendis distinctio excepturi, voluptatum ad quia illo nobis iste quod qui laborum dolores eos!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/de0arvpgi/image/upload/v1612970688/YelpCamp/pq9f7zt7ylpyoary6lgl.jpg',
          filename: 'YelpCamp/pq9f7zt7ylpyoary6lgl',
        },
        {
          url: 'https://res.cloudinary.com/de0arvpgi/image/upload/v1612971021/YelpCamp/s2mxqlj6emmivmkftd8p.jpg',
          filename: 'YelpCamp/s2mxqlj6emmivmkftd8p',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
