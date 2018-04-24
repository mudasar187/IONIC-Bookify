import { LoadingController } from 'ionic-angular';

/**
 * This class contains the loadings controller
 */

export class LoadController {

  loader: any;

  constructor(
    private loading: LoadingController) {
  }

  presentLoader(title: string) {
    this.loader = this.loading.create({
      spinner: "bubbles",
      content: title
    });
    this.loader.present();
  }

  dismissLoader() {
    this.loader.dismiss();
  }

}

