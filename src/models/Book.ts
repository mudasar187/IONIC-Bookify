export interface Book {
  id?: string,
  userId: string,
  userNickName: string,
  bookAuthor: string,
  bookImage: string,
  bookIsbn: string,
  bookTitle: string,
  bookDescription: string,
  bookPrice: number,
  bookConditions: string,
  bookSold: false,
  location: string,
  lat: number,
  lng: number,
  created: any;
}
