import { AlertController } from "ionic-angular";

export class AlertMessages {

  constructor(private alert: AlertController) {
  }

  presentAlert(title: string) {
    let alert = this.alert.create({
      title: title,
      buttons: ['OK'],
      enableBackdropDismiss: false // make user not allowed to press outside, must press ok
    });
    alert.present();
  }
}
