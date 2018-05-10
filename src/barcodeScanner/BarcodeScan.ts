import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Barcode Scanner class
 * https://ionicframework.com/docs/native/barcode-scanner/
 */
export class BarcodeScan {

  options: BarcodeScannerOptions;

  constructor(private barcodeScanner: BarcodeScanner) { }

  
  // scan the barcode
  // return data from barcode
  scanBarcode(getData: (data: {}) => void, error: () => void) {
    this.options = {
      prompt: "Scan your code"
    }
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      getData(barcodeData);
    }).catch((error: any) => {
      error(); // If error
    });
  }

}
