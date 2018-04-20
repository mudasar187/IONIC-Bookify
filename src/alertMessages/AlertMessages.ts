import { ToastController } from 'ionic-angular';

/**
 * This class contains all type of messages
 * Toast messages, alert messages
 */

export class AlertMessages {

  constructor(
    private toast?: ToastController) {
  }

  // Toast message to welcome a user based on nickname, used in app.component.ts file with 1000ms duration
  presentWelcomeUserToast(title: string) {
    this.toast.create({
      message: title,
      duration: 1000
    }).present();
  }

  // Global toast message with 1500ms duration
  presentCustomToast(title: string) {
    this.toast.create({
      message: title,
      duration: 2000
    }).present();
  }

}
