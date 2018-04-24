import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertCmp, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';
import { Camera } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * This class contains user's profile
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user = {} as User; // create an object of user
  userObject: any;
  profileImage: string;
  loadingPopUp: any;
  alertPopUp: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    private photoViewer: PhotoViewer,
    private loader: LoadingController,
    private alert: AlertController) {

    this.userObject = this.af.app.auth().currentUser;
    this.user.nickname = this.userObject.displayName;
    this.user.email = this.userObject.email;
  }

  resizeImage() {
    this.photoViewer.show(this.userObject.photoURL);
  }

  // execute camera and then add to firestorage
  executeCamera() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true
    }).then(imgBase64 => {
      this.profileImage = imgBase64;
    }).then(() => {
      this.addProfilePicture();
    })
  }

  // present loader for chaning profil picture, to show user that something is happening if connection is slow
  presentLoader(title: string) {
      this.loadingPopUp = this.loader.create({
        spinner: "bubbles",
        content: title
      });
      this.loadingPopUp.present();
  }

  // dismiss loader when profile picture is updated
  dismissLoader() {
    this.loadingPopUp.dismiss();
  }

  // present alert if profile picture cannot be changed, specify that something is wrong, connection or firebase
  presentAlert(title: string) {
    let alert = this.alert.create({
      title: title,
      buttons: ['OK'],
      enableBackdropDismiss: false // make user not allowed to press outside, must press ok
    });
    alert.present();
  }

  // to add profile picture to firestorage
  addProfilePicture() {
    // generate a filename for the image we're going to upload based on user's email and second
    let imageFileName = `${this.af.app.auth().currentUser.email}_${new Date().getTime()}.png`;

    // make a task that upload the picture
    let task = this.afStorage
      .ref(`${this.userObject.email}`) // create a folder to upload image to user's folder named as user's email
      .child(imageFileName) // fileName for the file
      .putString(this.profileImage, 'base64', { contentType: 'image/png' }); // set as string

    // make a event to we can follow when the picture is uploaded
    let uploadEvent = task.downloadURL();

    // when the image is uploaded, we can now get the URL accsess
    this.presentLoader('Oppdaterer profilbildet'); // show user that picture is being updated
    uploadEvent.subscribe((uploadImgUrl) => {
      this.af.app.auth().currentUser.updateProfile({ displayName: this.user.nickname, photoURL: uploadImgUrl });
      this.dismissLoader(); // dismiss when its updated
    }, (err : any) => {
      this.dismissLoader();
      this.presentAlert('Oppss.. Noe gikk galt..');
    });
  }

  deleteLastProfilePicture(lastImageURL: string) {
    // delete last previous image
  }

  // logout from app
  logOut() {
    this.af.app.auth().signOut();
    this.navigateToPage(LoginPage);
  }

  // navigate to page depend on which page
  navigateToPage(page: any) {
    this.navCtrl.push(page);
  }
}
