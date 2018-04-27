import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertCmp, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { User } from '../../models/User';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { PhotoOptions } from '../../cameraOptions/PhotoOptions';
import { ActionSheetMessages } from '../../popUpMessages/actionSheets/ActionSheetMessages';
import { AlertMessages } from '../../popUpMessages/alertMessages/AlertMessages';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LoaderMessages } from '../../popUpMessages/loaderMessages/LoaderMessages';
import { PlaceProvider } from '../../providers/place/place';

/**
 * This class contains user's profile
 * Navigate to MySalesPage and MyBuysPage
 * User can log out from here
 * And user can also take a new profile picture
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userObject: any; // crate an object of any to save user credentials from firestore

  private actionSheetMessages: ActionSheetMessages; // create an object of type ActionSheetsMessages
  private alertMessages: AlertMessages; // create an object of type AlertMessages
  private photoOptions: PhotoOptions; // create an object of type PhotoOptions
  private loadingMessages: LoaderMessages; // create an object of type LoaderMessages

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private af: AngularFirestore,
    private afStorage: AngularFireStorage,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private placeProvider: PlaceProvider) {

    this.loadingMessages = new LoaderMessages(this.loaderCtrl); // a new instance of LoaderMessage
    this.alertMessages = new AlertMessages(this.alertCtrl); // a new instance of AlertMessages
    this.photoOptions = new PhotoOptions(this.photoViewer, this.camera); // a new instance of PhotoOptions
    this.actionSheetMessages = new ActionSheetMessages(this.actionSheetCtrl);
    this.userObject = this.af.app.auth().currentUser; // get user credentials from firestore
  }

  // make picture bigger when user click on profile picture
  makeImageBigger() {
    this.photoOptions.resizeImage(this.userObject.photoURL); // take the image url string in parameter
  }

  // present ActionSheetController to give user options where to get image to add a profilepicture
  // use camera or gallery
  presentActionSheet() {
    this.actionSheetMessages.presentActionSheet(() => {
      this.photoOptions.executeCamera((base64Img) => {
        this.addProfilePicture(base64Img);
      });
    }, () => {
      this.photoOptions.getFromGallery((base64Img) => {
        this.addProfilePicture(base64Img);
      });
    });
  }

  // to add profile picture to firestorage
  // delete the previous image before adding a new profile picture
  addProfilePicture(imgBase64: string) {
    this.deleteImage((success) => {
      this.uploadImage(imgBase64, (success) => {
        if (success) {
          console.log("DONE WITH DELETING AND UPLOADING NEW IMAGE");
        }
      });
    });
  }

  // uploading the profile picture to firebase storage
  private uploadImage(imgBase64: string, doneUploading: (success: boolean) => void) {
    let imageFileName = `${this.userObject.email}_${this.userObject.uid}.png`;

    // make a task that upload the picture
    let task = this.afStorage
      .ref(`${this.userObject.email}`) // create a folder to upload image to user's folder named as user's email
      .child(imageFileName) // fileName for the file
      .putString(imgBase64, 'base64', { contentType: 'image/png' }); // set as string

    // make a event to we can follow when the picture is uploaded
    let uploadEvent = task.downloadURL();

    // when the image is uploaded, we can now get the URL accsess
    this.loadingMessages.presentLoader('Oppdaterer profilbildet'); // show user that picture is being updated

    uploadEvent.subscribe((uploadImgUrl) => {
      this.af.app.auth().currentUser.updateProfile({ displayName: this.userObject.displayName, photoURL: uploadImgUrl }); // update profile
      this.loadingMessages.dismissLoader(); // dismiss when its updated
      doneUploading(true);
    }, (err: any) => {
      this.loadingMessages.dismissLoader(); // dissmiss if any error
      this.alertMessages.presentAlert('Oppss.. Noe gikk galt...') // show a error message
      doneUploading(false);
    });
  }

  // delete previous profile picture image when taking a new one
  // avoid to add many profile pictures at firebase storage
  private deleteImage(doneDeleting: (success: boolean) => void) {
    let deleteImageName = `${this.userObject.email}_${this.userObject.uid}.png`; // profice picture name
    let deleteTask = this.afStorage.storage.ref(this.userObject.email).child(deleteImageName).delete()
      .then((success) => {
        doneDeleting(true);
      }).catch((error) => {
        doneDeleting(false);
      });
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
