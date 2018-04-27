import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from "@ionic-native/photo-viewer";

/**
 * This class contains operations with getting pictures by camera, gallery and showing picture at bigger size
 */
export class PhotoOptions {

  constructor(private photoViewer: PhotoViewer,
    private camera: Camera) {
  }

  // show preview of picture bigger when user press on picture
  resizeImage(image: string) {
    this.photoViewer.show(image);
  }

  // get a picture by using camera
  executeCamera(getImage: (base64: string) => void) {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }
    this.camera.getPicture(options).then(imgBase64 => {
      getImage(imgBase64);
    });
  }

  // get a picture from gallery
  getFromGallery(getImage: (base64: string) => void) {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.camera.getPicture(options).then(imgBase64 => {
      getImage(imgBase64);
    });
  }

}
