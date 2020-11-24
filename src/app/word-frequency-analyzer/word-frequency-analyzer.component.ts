import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-word-frequency-analyzer',
  templateUrl: './word-frequency-analyzer.component.html',
  styleUrls: ['./word-frequency-analyzer.component.scss']
})
export class WordFrequencyAnalyzerComponent implements OnInit {
  wordCount: any;

  @ViewChild('text') text: ElementRef;
  words: any;
  mostFrequentWord: any;
  mostFrequentAmount: any;
  mostFrequentNAmount: any;
  status: boolean;

  frequencyCounter() {
    this.status = !this.status;

    this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/i) : 0;
    this.words = this.wordCount ? this.wordCount.length : 0;

    const arr = this.wordCount;
    const temp = {};
    const sorted = [];

    for (let i = 0; i < arr.length; i++) {
        if (temp[arr[i]] === undefined) {
           temp[arr[i]] = 1;
        } else {
            temp[arr[i]] += 1;
        }

        //try and sort lowercase
        sorted.push(arr[i].toLowerCase());
        sorted.sort();
        console.log('sorted: ', sorted);
        console.log('temp: ', temp);
    }

    let max = 0;
    let maxEle;

    for (const i in temp) {
        if (temp[i] > max) {
            max = temp[i];
            maxEle = i;
        }
    }

    this.mostFrequentWord = maxEle;
    this.mostFrequentAmount = ' = Detected ' +  max + ' times';
    this.mostFrequentNAmount = temp;
    console.log(`most occurred element is "${maxEle}" and number of times is ${max + 1}`); // 0 based

    const freqNAmount = document.getElementById('freqNAmount') as HTMLInputElement;

    let object = JSON.stringify(this.mostFrequentNAmount);
    object = object.replace(/[{}";\/]/g, '')
      .replace(/[,]/g, ', ' )
      .replace(/[:]/g, ': ');
    freqNAmount.textContent = JSON.stringify(this.mostFrequentNAmount);
    freqNAmount.textContent = JSON.stringify(object);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
