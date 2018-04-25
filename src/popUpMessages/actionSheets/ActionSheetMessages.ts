import { AlertController, ActionSheetController } from "ionic-angular";

/**
 * This class contains all types of ActionSheetController popup
 */
export class ActionSheetMessages {

  constructor(
    private actionSheetCtrl?: ActionSheetController) {
  }

  // show user where to get picture, either take a new or from gallery
  presentActionSheet() {
    let actionSheetPopUp = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Ta nytt bilde',
          icon: 'camera',
          handler: () => {
            // kall på kamera metoden her valg 1
          }
        }, {
          text: 'Hent fra galleri',
          icon: 'images',
          handler: () => {
           // kall på kamera metoden her valg 2
          }
        }
      ]
    });
    actionSheetPopUp.present();
  }


}
