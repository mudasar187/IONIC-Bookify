import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
export class BarcodeScan {

  options: BarcodeScannerOptions;

  constructor(private barcodeScanner: BarcodeScanner) {
  }

  // Method for scanning barcodes
  scanBarcode(getData: (data: {}) => void, error: () => void) {
    this.options = {
      prompt: "Scan your code"
    }
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      getData(barcodeData);
    }).catch((error: any) => {
      error();
    });
  }


}
