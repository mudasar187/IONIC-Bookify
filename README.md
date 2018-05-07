## Crossplatform TDS200

## Exam Spring 2018

## Bookify Mobile Application

#### Application based on selling used books in a university

###### - Tools
- IONIC
- TypeScript
- Anuglar.js
- Cordova
- NPM
- JavaScript
- [Firestore](https://firebase.google.com/) You need an account here and set up before test application

###### - Functionality
- Login system
- Register system
- Reset password system
- Feed page where all books is listed
- Add new book for sale
- Simple chat system between buyer/seller
- Profile page with log out button and 'My Ads' with all active book sales and inactive when book is sold
- Mark book as sold or delete book
- Camera functionality to add picture from camera or gallery
- Barcode scanner to scan ISBN numbers
- Connected to Google Book Api, when scanned with barcode , then it will retrive information from API based on ISBN number

###### - How to run application (enter commands in terminal)
- Clone repo
- Insert an api key in /src/index.html, see below<br/>
< script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY" async defer></>
- Add also a new file named 'apiKeys.ts' and save that file into -> src/env/apiKeys.ts and insert -> see blow<br/>
export default {<br/>
  GOOGLE_API_KEY: "YOUR_API_KEY"<br/>
}

- Now run this command inside project root from terminal -> npm install <- to install dependencies

