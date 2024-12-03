import { ViewChildren, AfterViewInit, Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-word-game',
  standalone: true,
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss'],
  imports: [
    NgForOf
  ],
})
export class WordGameComponent implements AfterViewInit{
  @ViewChildren('row') rows: any;
  @ViewChildren('letter') letters: any;
  wordsArr = [
    'shoot', 'shout', 'false', 'alert', 'tough', 'rough', 'beach', 'break', 'crowd', 
    'breed', 'crown', 'brief', 'chart', 'curve', 'bring', 'about', 'click', 'music',                
    'hotel', 'email', 'games', 'store', 'group', 'forum', 'local', 'phone', 'house',
    'today', 'black', 'think', 'photo', 'water', 'image', 'white', 'title', 'money',
    'class', 'value', 'table', 'start', 'below', 'movie', 'point', 'three', 'women'
  ];
  wordOfDay = this.wordsArr[Math.floor(Math.random() * this.wordsArr.length)];
  button = document.querySelectorAll('button');
  word_row = document.querySelectorAll('.row');
  public wordRow : any;
  public lettersInRow: any;
  row = 0;
  letter = 0;
  gameOver = false;
  guessed = false;
  constructor(){
    
  }
  ngAfterViewInit(){
    this.wordRow = this.rows._results;
    this.lettersInRow = this.wordRow[this.row].nativeElement.children;
    this.button.forEach( (e: any) => {
      e.addEventListener("click", () => {
        this.keyPress(e.attributes["data-key"].value);
      });
    });

    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if(key.match(/\b[a-z]{1}\b/g) || key === 'enter' || key === 'delete' || key === 'backspace'){
        this.keyPress(e.key.toUpperCase());
      };
    })
    
  }
  main(key: any){
    if(this.letter < 5){
      // word_row[row].querySelectorAll('.letter')[letter].innerHTML = key;
      this.wordRow[this.row].nativeElement.children[this.letter].innerText = key;
      this.letter += 1;
    }
  }
  checkWord() {
    // const rowLetters = word_row[row].querySelectorAll('.letter');
    const rowLetters = this.wordRow[this.row].nativeElement.childNodes;
    console.log();
    console.log(rowLetters);
    let numOfCorrectLetters = 0;
    rowLetters.forEach( (e: any, index: any) => {
      if(this.wordOfDay.toLowerCase().charAt(index) === e.innerText.toLowerCase()){
        e.classList.add('word-green');
        numOfCorrectLetters++;
      }else if(this.wordOfDay.toLowerCase().indexOf(e.innerText.toLowerCase()) > -1){
        e.classList.add('word-yellow');
      }else{
        e.classList.add('word-red');
      }
    });

    if(numOfCorrectLetters === 5){
      this.gameOver = true;
      this.guessed = true;
      this.button.forEach( (e) => {
        e.setAttribute('disables', 'true');
      });

      alert('congratulations'); 
    }else if( this.row === 8){
      this.gameOver = true;
      alert('Maybe next time. The answer is : ' + this.wordOfDay);
    }
  }    
  enter() {
    if(this.letter < 5){
      alert('not enough letters');
    }else {
      this.checkWord();
      this.row += 1;
      this.letter = 0;
    }
  }
  deleteLetter(){
    // const letterDel = word_row[row].querySelectorAll('.letter');
    const letterDel = this.wordRow[this.row].nativeElement.children;
    for(let i = letterDel.length - 1; i >= 0; i--){
      let erase = letterDel[i];
      if(erase.innerHTML !== ''){
        erase.innerText = '';
        this.letter--;
        break;
      }
    }
  }
  keyPress(key: any){
    if(key.toLowerCase() === 'enter'){
      this.enter();
    }else if(key.toLowerCase() === 'del' || key.toLowerCase() === 'delete' || key.toLowerCase() === 'backspace'){
      this.deleteLetter();
    }else{
      this.main(key);
    }
  }
  resetGame(){
    location.reload();
  }
}
