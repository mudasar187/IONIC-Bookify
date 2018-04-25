import { LoadingController } from 'ionic-angular';

/**
 * This class contains all LoadingController popups
 */
export class LoaderMessages {

  loadingPopUp: any; // creating an loadingPopUp type of any so i can use it outside methods

  constructor(private loaderCtrl: LoadingController) {
  }

   // present loader with own custom title
   presentLoader(title: string) {
    this.loadingPopUp = this.loaderCtrl.create({
      spinner: "bubbles",
      content: title
    });
    this.loadingPopUp.present();
  }

  // dismiss loader
  dismissLoader() {
    this.loadingPopUp.dismiss();
  }
}
