export interface Book {
  userId: string,
  userNickName: string,
  userImage: string,
  bookImage: string,
  bookIsbn: string,
  bookTitle: string,
  bookDescription: string,
  bookPrice: number,
  bookConditions: string,
  bookSold: false,
  active: true,
  location: string,
  lat: number,
  lng: number,
  created: any;
}
