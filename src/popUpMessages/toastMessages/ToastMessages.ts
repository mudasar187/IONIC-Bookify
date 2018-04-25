import { ToastController } from 'ionic-angular';

/**
 * This class contains all ToastController messages
 */

export class ToastMessages {

  constructor(private toast: ToastController) {
  }

  // present toast with own custom title with duration of time 1500ms
  presentCustomToast(title: string) {
    this.toast.create({
      message: title,
      duration: 1500
    }).present();
  }

}
