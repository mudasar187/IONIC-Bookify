import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from "@ionic-native/photo-viewer";

export class PhotoOptions {

  constructor(private camera?: Camera,
              private photoViewer?: PhotoViewer) {

  }

  // show preview of picture bigger when user press on picture
  resizeImage(image: string) {
    this.photoViewer.show(image);
  }

}
