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
  profileImage: string; // to upload the image

  actionSheetMessages: ActionSheetMessages; // create an object of type ActionSheetsMessages
  alertMessages: AlertMessages; // create an object of type AlertMessages
  photoOptions: PhotoOptions; // create an object of type PhotoOptions
  loadingMessages: LoaderMessages; // create an object of type LoaderMessages


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore,
    private afStorage: AngularFireStorage,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    private loaderCtrl: LoadingController,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController) {

    this.loadingMessages = new LoaderMessages(this.loaderCtrl); // a new instance of LoaderMessage
    this.alertMessages = new AlertMessages(this.alertCtrl); // a new instance of AlertMessages
    this.photoOptions = new PhotoOptions(this.photoViewer); // a new instance of PhotoOptions
    this.userObject = this.af.app.auth().currentUser; // get user credentials from firestore
  }

  // make picture bigger when user click on profile picture
  makeImageBigger() {
    this.photoOptions.resizeImage(this.userObject.photoURL); // take the image url string in parameter
  }

  // create own class for this one !!
  executeCamera(sourceType: number) {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true,
      sourceType: sourceType,
    }
    this.camera.getPicture(options).then(imgBase64 => {
      this.profileImage = imgBase64;
    }).then(() => {
      this.addProfilePicture();
    })
  }

  // delete when its fixed up, have own class for this one too !
  presentActionSheet() {
    let actionSheetPopUp = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Ta nytt bilde',
          icon: 'camera',
          handler: () => {
            this.executeCamera(1);
          }
        }, {
          text: 'Hent fra galleri',
          icon: 'images',
          handler: () => {
            this.executeCamera(0);
          }
        }
      ]
    });
    actionSheetPopUp.present();
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
    this.loadingMessages.presentLoader('Oppdaterer profilbildet'); // show user that picture is being updated
    uploadEvent.subscribe((uploadImgUrl) => {
      this.af.app.auth().currentUser.updateProfile({ displayName: this.userObject.displayName, photoURL: uploadImgUrl });
      this.loadingMessages.dismissLoader(); // dismiss when its updated
    }, (err: any) => {
      this.loadingMessages.dismissLoader();
      this.alertMessages.presentAlert('Oppss.. Noe gikk galt...')
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
