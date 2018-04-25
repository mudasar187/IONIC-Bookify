import { ToastController } from 'ionic-angular';

/**
 * This class contains all type toast messages
 */

export class ToastMessages {

  constructor(private toast: ToastController) {
  }

  // Global toast message with 1500ms duration
  presentCustomToast(title: string) {
    this.toast.create({
      message: title,
      duration: 1500
    }).present();
  }

}
