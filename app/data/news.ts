import type { NewsItem } from '~/types'

export const currentNewsItems: NewsItem[] = [
  {
    title: 'Buy One, Get One 50% Off',
    date: 'Monday-Friday: 4PM - 7PM',
    category: 'Promotion',
    image: '/HappyHour.webp',
    description: 'During the assigned hours, come in and order 2 drinks from the poster and get 50% off the second drink.',
    featured: true
  },
  {
    title: 'We are now Catering!',
    date: 'Open Hours, Anyday',
    category: 'Events',
    image: '/Catering.webp',
    description: "Weddings, birthdays, or corporate events, Hello Boba is hitting the road. Book our mobile setup for your next party.",
    featured: false
  },
  {
    title: '10% Off Any Order',
    date: 'Open Hours, Anyday',
    category: 'Promotion',
    image: '/Reviews.webp',
    description: 'To get 10% off your entire order, give us a review on Google and/or Yelp, it helps us get our name around and helps you spend less!',
    featured: false
  },
  {
    title: 'Game Night',
    date: 'Saturday-Sunday: 7PM - 10PM',
    category: 'Promotion',
    image: '/GameNight.webp',
    description: 'On the weekends, drop by during the final hours and get special discounts and rates on token to play our merchandisers!',
    featured: true
  },
  {
    title: '10% Off Any Order',
    date: 'Open Hours, Anyday',
    category: 'Promotion',
    image: '/School.webp',
    description: 'If you are a student, feel free to show us your student ID to get a 10% discount off your entire order!',
    featured: true
  }
]

export const previousNewsItems: NewsItem[] = [
  {
    title: 'The Lemon Challenge',
    date: 'January 1, 2026 - January 31, 2026',
    category: 'Challenge',
    image: '/LemonChallenge.webp',
    description: 'Come by and try your luck to balance a quarter on top of a lemon for a free drink. If you succeed in doing so, you get a picture on the wall and a free drink of your choice!'
  },
  {
    title: 'Christmas Day Special',
    date: 'December 25, 2025',
    category: 'Announcement',
    image: '/Christmas.webp',
    description: 'Come in on Christmas Day and get 25% off 1 drink on any order of 2 or more drinks from our Matcha Series!'
  },
  {
    title: 'Christmas Eve Special',
    date: 'December 24, 2025',
    category: 'Announcement',
    image: '/ChristmasEve.webp',
    description: 'Come in on Christmas Day and get 50% off 1 drink on any order of 2 or more drinks from our Creme Brulee Series!'
  }
]
