import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DetailsPage } from '../details/details';
import { LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/Camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

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
  items = [];
  uname: any = "";
  email: any = "chanky.mallick@gmail.com";
  phone: any = "03214267021";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private sqlite: SQLite
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
      console.log(base64Image);
    }, (err) => {
      console.log(err);
    });
  }
  call() {


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

  storeData() {
    console.log("Updated Database");
    this.sqlite.create({
      name: 'ionic_poc1.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('create table USERS(name VARCHAR(32),email varchar(32),phone varchar(1))', {})
        .then(() => console.log('Table Created'))
        .catch(e => console.log(e));

      db.executeSql("INSERT INTO users(name,email,phone) values(?,?,?)", [this.uname, this.email, this.phone])
        .then(() => console.log('DATA INSERTED'))
        .catch(e => console.log(e));

      db.executeSql('select * from users', {}).then((data) => {
        console.log("Retreievd Data :" + JSON.stringify(data));
        this.items = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            //alert(data.rows.item(i).name);�
            console.log("Name : "+data.rows.item(i).name);
            console.log("Name : "+data.rows.item(i).email);
            console.log("Name : "+data.rows.item(i).phone);            
          }
        }
      });

    })
      .catch(e => console.log(e));
  }

}
