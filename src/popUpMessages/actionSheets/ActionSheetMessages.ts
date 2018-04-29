import { AlertController, ActionSheetController } from "ionic-angular";

/**
 * This class contains all ActionSheetController popups
 */
export class ActionSheetMessages {

  constructor(
    private actionSheetCtrl: ActionSheetController) {
  }

  // show user where to get picture, either take a new or from gallery
  presentActionSheet(title: string, cameraAction: () => void, galleryAction: () => void) {
    let actionSheetPopUp = this.actionSheetCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Ta nytt bilde',
          icon: 'camera',
          handler: () => {
            cameraAction(); // execute camera
          }
        }, {
          text: 'Hent fra galleri',
          icon: 'images',
          handler: () => {
            galleryAction(); // get from gallery
          }
        }, {
          text: 'Avbryt',
          icon: 'close-circle',
          handler: () => {
              actionSheetPopUp.dismiss(); // cancel actionsheet
          }
        }
      ]
    });
    actionSheetPopUp.present();
  }

  // show user where to get picture, either take a new or from gallery
  // also delete profile picture if wanted
  presentActionSheetForProfilePicture(cameraAction: () => void, galleryAction: () => void, deleteProfilePicture: () => void) {
    let actionSheetPopUp = this.actionSheetCtrl.create({
      title: 'Velg alternativ',
      buttons: [
        {
          text: 'Ta nytt bilde',
          icon: 'camera',
          handler: () => {
            cameraAction(); // execute camera
          }
        }, {
          text: 'Hent fra galleri',
          icon: 'images',
          handler: () => {
            galleryAction(); // get from gallery
          }
        }, {
            text: 'Slett profilbildet',
            icon: 'trash',
            handler: () => {
              deleteProfilePicture(); // delete profile picture
            }
        }, {
          text: 'Avbryt',
          icon: 'close-circle',
          handler: () => {
              actionSheetPopUp.dismiss(); // cancel actionsheet
          }
        }
      ]
    });
    actionSheetPopUp.present();
  }

  // show user where to get picture, either take a new or from gallery
  presentActionSheetSellBookOptions(barCodeAction: () => void) {
    let actionSheetPopUp = this.actionSheetCtrl.create({
      title: 'Hvordan ønsker du legge inn ISBN nummer?',
      buttons: [
        {
          text: 'Legge inn manuelt',
          icon: 'create',
          handler: () => {
            actionSheetPopUp.dismiss(); // cancel actionsheet
          }
        }, {
          text: 'Bruk strekkode scanner',
          icon: 'barcode',
          handler: () => {
            barCodeAction();
          }
        }, {
          text: 'Avbryt',
          icon: 'close-circle',
          handler: ()=> {
            actionSheetPopUp.dismiss(); // cancel actionsheet
          }
        }
      ]
    });
    actionSheetPopUp.present();
  }


}
