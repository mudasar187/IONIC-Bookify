import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from "@ionic-native/photo-viewer";

/**
 * This class contains all operations with getting pictures by camera, gallery and showing pictures
 */
export class PhotoOptions {

  constructor(private photoViewer: PhotoViewer,
              private camera: Camera) {
  }

  // show preview of picture bigger when user press on picture
  resizeImage(image: string) {
    this.photoViewer.show(image);
  }

  // get a picture using camera
  // JavaScript Closure
  executeCamera(getImage: (base64: string) => void) {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA, // use camera
    }
    this.camera.getPicture(options).then(imgBase64 => {
      getImage(imgBase64);
    });
  }

  // get a picture from gallery
  // JavaScript Closure
  getFromGallery(getImage: (base64: string) => void) {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, // use gallery
    }
    this.camera.getPicture(options).then(imgBase64 => {
      getImage(imgBase64);
    });
  }

}
