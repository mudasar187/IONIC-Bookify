import { LoadingController } from 'ionic-angular';
export class LoaderMessages {

  loadingPopUp: any;

  constructor(private loaderCtrl: LoadingController) {
  }

   // present loader for chaning profil picture, to show user that something is happening if connection is slow
   presentLoader(title: string) {
    this.loadingPopUp = this.loaderCtrl.create({
      spinner: "bubbles",
      content: title
    });
    this.loadingPopUp.present();
  }

  // dismiss loader when profile picture is updated
  dismissLoader() {
    this.loadingPopUp.dismiss();
  }
}
