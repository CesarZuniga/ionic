import { Animal } from './../../interfaces/animal.interface';
import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  reorder = false;
  audio = new Audio();
  animals: Animal[] = [];
  audioTime: any;
  constructor(public navCtrl: NavController) {

    this.animals = ANIMALES.slice(0);

  }
  play(animal: Animal) {
    this.pausarAudio(animal);
    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }
    this.audio = new Audio();
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;
    this.audioTime = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);
  }
  private pausarAudio(animalSelecte: Animal) {
    clearTimeout(this.audioTime);
    this.audio.pause();
    this.audio.currentTime = 0;
    for (let animal of this.animals) {
      if (animal.nombre != animalSelecte.nombre) {
        animal.reproduciendo = false;
      }
    }
  }
  delete(index: number){
    this.animals.splice(index,1);
  }
  doRefresh(refresher:Refresher){
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      this.animals = ANIMALES.slice(0);
      refresher.complete();
    }, 300);
  }
  reorderAnimals(indices: any){
    console.log(indices);
    this.animals = reorderArray(this.animals, indices);
  }
}
