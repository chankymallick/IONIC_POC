import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailsPage } from '../details/details';
import { LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/Camera';
import { CallNumber } from '@ionic-native/call-number';





@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  uname: any = "";
  email: any = "chanky.mallick@gmail.com";
  phone: any = "03214267021";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private callNumber: CallNumber
    ) {

  }

  getCameraImage() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    this.camera.getPicture().then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //  this.http.get("http://chankymallick.appspot.com/myServlet?chat="+encodeURI(base64Image));
      this.presentLoading(base64Image);
    }, (err) => {
      console.log(err);
    });
  }
  call() {

    this.callNumber.callNumber(this.phone, false)
      .then(() => this.presentLoading('Launched dialer!'))
      .catch(() => this.presentLoading('Error launching dialer'));
  }
  presentLoading(val) {
    let loader = this.loadingCtrl.create({
      content: val,
      duration: 5000,
      dismissOnPageChange: true
    });
    loader.present();
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
  }
  saveData() {
    this.presentLoading("Please Wait ...");
    this.http.get('http://jsonplaceholder.typicode.com/users').map(res => res.json()).subscribe(data => {
      this.navCtrl.push(DetailsPage, { item: data });
    });
  }
  light(val) {
    // if (val)
    //   this.flashlight.switchOn();
    // else
    //   this.flashlight.switchOff();
  }
}
