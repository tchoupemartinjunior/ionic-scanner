import { Component } from '@angular/core';
import {  BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  scannedResult?: string;
  contentVisibility:string="";

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async startScan(): Promise<void> {
    try{
      const granted = await this.requestPermissions();
      if (!granted) {
        this.presentAlert();
        return;
      }
      // make background of WebView transparent
      BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.contentVisibility ="hidden";
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      this.contentVisibility ="";
      setTimeout(()=>{
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
      },2000)

        // if the result has content
    if (result.hasContent) {
      this.scannedResult =result.content;
      console.log(this.scannedResult);
      this.contentVisibility ="";
    }
  
    } catch(e){
      console.log(e);
      this.stopScan();
    }

  }

  async requestPermissions(): Promise<boolean> {
    const status = await BarcodeScanner.checkPermission({ force: true });
    return status.granted ?? false;
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }
  
  stopScan(){
    this.contentVisibility ="";
    BarcodeScanner.showBackground();
    document.querySelector('body')?.classList.remove('scanner-active');
    BarcodeScanner.stopScan();
  };

  scanDocument(event:any){
    if(event){
      this.startScan()
    }
  }
  ngOnDestroy():void{
    this.stopScan();
  }
}
