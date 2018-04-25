import { AlertController } from "ionic-angular";

/**
 * This class contains all AlertController popups
 */
export class AlertMessages {

  constructor(private alert: AlertController) {
  }

  // present alert with own custom title
  presentAlert(title: string) {
    let alert = this.alert.create({
      title: title,
      buttons: ['OK'],
      enableBackdropDismiss: false // make user not allowed to press outside, must press ok
    });
    alert.present();
  }
}
