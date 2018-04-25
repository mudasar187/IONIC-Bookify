import { AlertController, ActionSheetController } from "ionic-angular";

/**
 * This class contains all ActionSheetController popups
 */
export class ActionSheetMessages {

  constructor(
    private actionSheetCtrl: ActionSheetController) {
  }

  // show user where to get picture, either take a new or from gallery
  // JavaScript closures
  presentActionSheet(cameraAction: () => void, galleryAction: () => void) {
    let actionSheetPopUp = this.actionSheetCtrl.create({
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
          handler: ()=> {
              actionSheetPopUp.dismiss(); // cancel actionsheet
          }
        }
      ]
    });
    actionSheetPopUp.present();
  }


}
