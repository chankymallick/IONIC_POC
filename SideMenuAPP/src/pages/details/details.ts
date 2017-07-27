import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  listOfUsers :any;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.listOfUsers =   navParams.get('item');
  console.log(JSON.stringify(this.listOfUsers[0]));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
