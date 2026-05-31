export interface Drink {
  name: string
  price: string
  description: string
  image: string
}

export interface MenuPrice {
  R: string
  L: string
}

export interface MenuItem {
  type: string
  name: string
  price: MenuPrice
  description: string
  DF: boolean
  CF: boolean
  image: string
}

export interface Topping {
  name: string
  description: string
  image: string
}

export interface BobaOption {
  name: string
  description: string
  image: string
}

export interface FoodFlavor {
  name: string
  image: string
}

export interface FoodCategory {
  type: string
  items: FoodFlavor[]
}

export interface StoreLocation {
  id: string
  label: string
  name: string
  addressLines: [string, string]
  phone: string
  weekdayHours: string
  weekendHours: string
  mapEmbedSrc: string
  directionsUrl: string
}

export interface NewsItem {
  title: string
  date: string
  category: string
  image: string
  description: string
  featured?: boolean
}

export interface SocialLink {
  media: string
  link: string
}
