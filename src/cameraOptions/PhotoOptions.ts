import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from "@ionic-native/photo-viewer";

/**
 * This class contains all operations withtaking pictures and showing pictures
 */
export class PhotoOptions {

  constructor(private photoViewer?: PhotoViewer) {
  }

  // show preview of picture bigger when user press on picture
  resizeImage(image: string) {
    this.photoViewer.show(image);
  }

}
