import { ViewChildren, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-word-game',
  standalone: true,
  templateUrl: './word-game.component.html',
  styleUrls: ['./word-game.component.scss'],
  providers: [MessageService],
  imports: [
    ToastModule,
    RippleModule
  ],
})
export class WordGameComponent implements AfterViewInit, OnInit{
  @ViewChildren('row') rows: any;
  @ViewChildren('letter') letters!: HTMLInputElement;
  @ViewChild('resetBtn') resetBtn: any;
  wordsArr = [
    'shoot', 'shout', 'false', 'alert', 'tough', 'rough', 'beach', 'break', 'crowd', 
    'breed', 'crown', 'brief', 'chart', 'curve', 'bring', 'about', 'click', 'music',                
    'hotel', 'email', 'games', 'store', 'group', 'forum', 'local', 'phone', 'house',
    'today', 'black', 'think', 'photo', 'water', 'image', 'white', 'title', 'money',
    'class', 'value', 'table', 'start', 'below', 'movie', 'point', 'three', 'women'
  ];
  wordOfDay = this.wordsArr[Math.floor(Math.random() * this.wordsArr.length)];
  word_row = document.querySelectorAll('.row');
  public wordRow : any;
  public lettersInRow: any;
  public reset: any;
  row = 0;
  letter = 0;
  gameOver = false;
  guessed = false;
  constructor(private _message: MessageService){
    
  }
  ngAfterViewInit(){
    this.wordRow = this.rows._results;
    this.lettersInRow = this.wordRow[this.row].nativeElement.children;
    console.log(this.wordOfDay);
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if(key.match(/\b[a-z]{1}\b/g) || key === 'enter' || key === 'delete' || key === 'backspace'){
        this.keyPress(e.key.toUpperCase());
      };
    })
  }
  main(key: any){
    if(this.letter < 5 && !this.gameOver){
      this.wordRow[this.row].nativeElement.children[this.letter].value = key;
      this.letter += 1;
      this.wordRow[this.row].nativeElement.children[this.letter].focus(); 
      this.wordRow[this.row].nativeElement.children[this.letter].value = '?'; 
    }
  }
  checkWord() {
    const rowLetters = this.wordRow[this.row].nativeElement.childNodes;
    let numOfCorrectLetters = 0;
    rowLetters.forEach( (e: any, index: any) => {
      if(this.wordOfDay.toLowerCase().charAt(index) === e.value.toLowerCase()){
        e.classList.add('word-green');
        numOfCorrectLetters++;
      }else if(this.wordOfDay.toLowerCase().indexOf(e.value.toLowerCase()) > -1){
        e.classList.add('word-yellow');
      }else{
        e.classList.add('word-red');
      }
    });

    if(numOfCorrectLetters === 5){
      this._message.add({severity: 'success', summary: 'Congratulations', detail: 'Try Another Word', life: 3000})
      this.gameOver = true;
      this.guessed = true;      
      this.wordRow[this.row].nativeElement.children[4].blur();
      this.wordRow[this.row].nativeElement.children[this.letter].setAttribute('disabled', 'true');
      
    }else if( this.row === 8){
      this.gameOver = true;
      this.wordRow[this.row].nativeElement.children[4].blur();
      this._message.add({severity: 'error', summary: 'Maybe Next Time', detail: `Answer is ${this.wordOfDay}`, life: 3000})
    }
  }    
  enter() {
    if(this.letter < 5){
      this._message.add({severity: 'info', summary: 'Not Enough Letters', detail: 'Type A 5 Letter Word', life: 3000})
    }else {
      this.checkWord();
      this.row += 1;
      this.letter = 0;
      this.wordRow[this.row].nativeElement.children[this.letter].focus();
    }
  }
  deleteLetter(){
    let letterDel = this.wordRow[this.row].nativeElement.children;
    for(let i = letterDel.length - 1; i >= 0; i--){
      letterDel[i].value = '';
      this.letter = 0;
      letterDel[0].focus();
    }
  }
  keyPress(key: any){
    if(key.toLowerCase() === 'enter' && !this.gameOver){
      this.enter();
    }else if(key.toLowerCase() === 'del' || key.toLowerCase() === 'delete' || key.toLowerCase() === 'backspace' && !this.gameOver){
      this.deleteLetter();
    }else{
      this.main(key);
    }
  }
  resetGame(){
    location.reload();
  }
  ngOnInit(): void {
    
  }
}
