import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  deleteImage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private af: AngularFirestore,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    private photoViewer: PhotoViewer) {

    this.userObject = this.af.app.auth().currentUser;
    this.user.nickname = this.userObject.displayName;
    this.user.email = this.userObject.email;
    this.deleteImage = this.userObject.photoURL;
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

  // to add profile picture to firestorage
  addProfilePicture() {

    // generate a filename for the image we're going to upload based on user's email and second
    let imageFileName = `${this.af.app.auth().currentUser.email}_${new Date().getTime()}.png`;

    // make a task that upload the picture
    let task = this.afStorage
      .ref(imageFileName) // specify that the filname is the same as we generated above
      .putString(this.profileImage, 'base64', { contentType: 'image/png' });

    // make a event to we can follow then the picture is uploaded
    let uploadEvent = task.downloadURL();

    // when the image is uploaded, we can now get the URL accsess
    uploadEvent.subscribe((uploadImgUrl) => {
      this.af.app.auth().currentUser.updateProfile({ displayName: this.user.nickname, photoURL: uploadImgUrl });
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
