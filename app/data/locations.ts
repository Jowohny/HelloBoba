import type { StoreLocation } from '~/types'

export const locations: StoreLocation[] = [
  {
    id: 'garvey',
    label: 'Location 01',
    name: 'Garvey Avenue',
    addressLines: ['11230 Garvey Ave #C', 'El Monte, CA 91733'],
    phone: '+16263617058',
    weekdayHours: '11:00 AM - 9:00 PM',
    weekendHours: '11:00 AM - 10:00 PM',
    mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1301.133246728493!2d-118.03310547593489!3d34.06255790259282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d1db6c36bda3%3A0x1fdf3db0b5303a86!2sHello%20Boba!5e0!3m2!1sen!2sus!4v1772080070106!5m2!1sen!2sus',
    directionsUrl: 'https://maps.google.com/maps/dir//Hello+Boba+11230+Garvey+Ave+%23C+El+Monte,+CA+91733/@34.062467,-118.0311685,18z/data=!4m5!4m4!1m0!1m2!1m1!1s0x80c2d1db6c36bda3:0x1fdf3db0b5303a86'
  },
  {
    id: 'peck',
    label: 'Location 02',
    name: 'Peck Road',
    addressLines: ['4788 Peck Rd', 'El Monte, CA 91732'],
    phone: '+16263617055',
    weekdayHours: '11:00 AM - 9:00 PM',
    weekendHours: '11:00 AM - 10:00 PM',
    mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13216.80613067854!2d-118.03296101284182!3d34.08997730000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2d91f75934401%3A0x7f2669691ab068dc!2sHello%20Boba!5e0!3m2!1sen!2sus!4v1772089565821!5m2!1sen!2sus',
    directionsUrl: 'https://maps.google.com/maps/dir//Hello+Boba+4788+Peck+Rd+El+Monte,+CA+91732/@34.0899773,-118.0139066,18z/data=!4m5!4m4!1m0!1m2!1m1!1s0x80c2d91f75934401:0x7f2669691ab068dc'
  }
]
