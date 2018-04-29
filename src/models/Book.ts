export interface Book {
  userId: string,
  nickName: string,
  image: string,
  isbn: string,
  heading: string,
  description: string,
  price: number,
  conditions: string,
  sold: false,
  location: string,
  lat: number,
  lng: number
}
