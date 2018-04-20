import { ToastController } from 'ionic-angular';

export class ToastMessage {

  constructor(private toast: ToastController) {
  }

  presentToast(title: any) {
    this.toast.create({
      message: title,
      duration: 1000
    }).present();
  }
}
