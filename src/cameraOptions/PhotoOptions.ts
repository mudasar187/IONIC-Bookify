import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from "@ionic-native/photo-viewer";

/**
 * Camera and PhotoViwer class
 * Camera -> https://ionicframework.com/docs/native/camera/
 * PhotoViewer -> https://ionicframework.com/docs/native/photo-viewer/
 */
export class PhotoOptions {

  constructor(
    private photoViewer: PhotoViewer,
    private camera: Camera) {
  }


  // show preview of picture bigger when user press on picture
  resizeImage(image: string) {
    this.photoViewer.show(image);
  }


  // get a picture by using camera
  // return the imageBase64 picture
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
  // return imageBase64 picture
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
