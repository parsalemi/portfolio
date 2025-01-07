import { NgClass } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sudoku',
  standalone: true,
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
  providers: [MessageService],
  imports: [
    ToastModule,
    NgClass,
    MatProgressBarModule
  ],
})
export class SudokuComponent implements AfterViewInit{
  @ViewChildren('slot') slots: any;
  public slot: any;
  public activeBtn!: number | string;
  public btn: any = [];
  public selectedCell: any = [];
  public allBtns: any = [];
  isHighlightedRow: any = null;
  isHighlightedCol: any = null;
  isNumberActive: any = null;
  errors: number = 0;
  filledSlots: number = 0;
  progress: number = 0;
  whichHint: any = 0;
  public placeHints = [ 
    () => this.normalHints(this.hints[this.whichHint as keyof Hint].Q), 
    () => this.normalHints(this.rotateMatrix90(this.hints[this.whichHint as keyof Hint].Q)),
  ];
  public hints: Hint = {
    0: {
      Q: [
        [9, '-', '-', 4, '-', '-', '-', '-', '-'],
        [4, '-', '-', '-', '-', '-', 9, '-', '-'],
        ['-', '-', 3, '-', 9, 8, '-', '-', 7],
        [7, 6, '-', '-', 2, '-', '-', '-', '-'],
        ['-', 3, '-', '-', 8, '-', '-', 7, '-'],
        ['-', '-', '-', '-', 1, '-', '-', 3, 2],
        [3, '-', '-', 2, 4, '-', 8, '-', '-'],
        ['-', '-', 1, '-', '-', '-', '-', '-', 6],
        ['-', '-', '-', '-', '-', 6, '-', '-', 9]
      ],
      A: [
        [9, 5, 7, 4, 6, 1, 2, 8, 3],
        [4, 1, 8, 7, 3, 2, 9, 6, 5],
        [6, 2, 3, 5, 9, 8, 4, 1, 7],
        [7, 6, 5, 3, 2, 4, 1, 9, 8],
        [1, 3, 2, 9, 8, 5, 6, 7, 4],
        [8, 4, 9, 6, 1, 7, 5, 3, 2],
        [3, 7, 6, 2, 4, 9, 8, 5, 1],
        [2, 9, 1, 8, 5, 3, 7, 4, 6],
        [5, 8, 4, 1, 7, 6, 3, 2, 9],
      ]
    },
    1: {
      Q: [
        ['-', '-', 7, 4, 9, 1, 6, '-', 5],
        [2, '-', '-', '-', 6, '-', 3, '-', 9],
        ['-', '-', '-', '-', '-', 7, '-', 1, '-'],
        ['-', 5, 8, 6, '-', '-', '-', '-', 4],
        ['-', '-', 3, '-', '-', '-', '-', 9, '-'],
        ['-', '-', 6, 2, '-', '-', 1, 8, 7],
        [9, '-', 4, '-', 7, '-', '-', '-', 2],
        [6, 7, '-', 8, 3, '-', '-', '-', '-'],
        [8, 1, '-', '-', 4, 5, '-', '-', '-'],
      ],
      A: [
        [3, 8, 7, 4, 9, 1, 6, 2, 5],
        [2, 4, 1, 5, 6, 8, 3, 7, 9],
        [5, 6, 9, 3, 2, 7, 4, 1, 8],
        [7, 5, 8, 6, 1, 9, 2, 3, 4],
        [1, 2, 3, 7, 8, 4, 5, 9, 6],
        [4, 9, 6, 2, 5, 3, 1, 8, 7],
        [9, 3, 4, 1, 7, 6, 8, 5, 2],
        [6, 7, 5, 8, 3, 2, 9, 4, 1],
        [8, 1, 2, 9, 4, 5, 7, 6, 3],
      ],
    }
  };

  constructor(private message: MessageService){
    this.whichHint = Math.floor(Math.random() * 2);
    document.body.addEventListener('click', (event: any) => {
      if(event.target.classList.contains('btn-secondary') == false && event.target.classList.contains('slot') == false){
        this.isNumberActive.classList.remove('selectedNumber');
        this.isNumberActive = null;
        this.message.add({severity: 'info', summary: 'Click On A Number!', detail: 'No Number Is Currently Active', life: 2000})
      }
      else{
        return;
      }
    })
  }

  activeNumber(number: number | string, btn: any){
    this.activeBtn = number;
    if(this.isNumberActive !== null){
      this.isNumberActive.classList.remove('selectedNumber');
    }
    this.isNumberActive = btn;
    this.isNumberActive.classList.add('selectedNumber')
    
    for(let i = 0; i < this.slot.length; i++){
      const button = this.slot[i].nativeElement;
      if(button.innerHTML == number){
        button.classList.add('allFromNum');
      }
      else{
        button.classList.remove('allFromNum')
      }
    }
  }
  setNumber(cell: any, number: number | string, row: number, column: number){
    // this.isHighlighted = false;
    if(this.isNumberActive != null){
      if(number == this.hints[this.whichHint as keyof Hint].A[row-1][column-1]){
        cell.innerHTML = number;
        this.filledSlots++;
        this.calcProgress(this.filledSlots)
        cell.classList.add('allFromNum');
      }
      else {
        this.errors++;
        this.message.add({severity: 'error', summary: 'Wrong!', detail: 'Try Again', life: 500})
      }
      if(this.calcProgress(this.filledSlots) === 100){
        this.message.add({severity: 'success', summary: 'Congratulation!', detail: 'Puzzle Completed', life: 5000})
      }
    }
  }
  highlightRowAndCol(row: number, col: number){
    const highlightRow: any = document.querySelectorAll(`[data-x='${row}']`);
    const highlightCol: any = document.querySelectorAll(`[data-y='${col}']`);
    if(this.isHighlightedRow !== null){
      this.isHighlightedRow.forEach((e: any) => e.classList.remove('highlight'));
      this.isHighlightedCol.forEach((e: any) => e.classList.remove('highlight'));
    }
    this.isHighlightedRow = highlightRow;
    this.isHighlightedCol = highlightCol;

    for(let i = 0; i < highlightRow.length; i++){
      highlightRow[i].classList.add('highlight');
      highlightCol[i].classList.add('highlight');
      // this.getSquares(this.normalHints(this.slot.slice(0, 9)));
    }
  
  }
  removeHighlight(row: number, col: number){
    const highlightRow: any = document.querySelectorAll(`[data-x='${row}']`);
    const highlightCol: any = document.querySelectorAll(`[data-y='${col}']`);
    if(this.isHighlightedRow !== null){
      this.isHighlightedRow.forEach((e: any) => e.classList.remove('highlight'));
      this.isHighlightedCol.forEach((e: any) => e.classList.remove('highlight'));
    }
    this.isHighlightedRow = highlightRow;
    this.isHighlightedCol = highlightCol;

    for(let i = 0; i < highlightRow.length; i++){
      highlightRow[i].classList.remove('highlight');
      highlightCol[i].classList.remove('highlight');
      // this.getSquares(this.normalHints(this.slot.slice(0, 9)));
    }
  }
  calcProgress(correct: number): number{
    this.progress = Math.floor((correct / 81) * 100);
    return this.progress;
  }
  ngAfterViewInit(): void {
    this.slot = this.slots._results;
    this.slot.forEach( (event: any) => {
      const cells = event.nativeElement;
      cells.addEventListener('click' , (e: any) => {
        // this.selectedCell.push(e.target);
        if(this.isNumberActive){
          this.setNumber(e.target, this.activeBtn, cells.dataset.x, cells.dataset.y);
        }
      });
      // cells.addEventListener('hover', (e: any) => {
      //   this.highlightRowAndCol(e.target.dataset.x, e.target.dataset.y);
      // })
    });
    const randomNumber = Math.floor(Math.random() * 2);
    this.placeHints[0]();
    // this.normalHints(this.hints[0].Q);
    this.calcProgress(this.filledSlots);
  }
  getSquares(btnMatrix: any){
    let arr = btnMatrix.slice(0, 9);
    let res = [];
    for (let t = 0; t < 9; t += 3) {
      for (let j = 0; j < 9; j += 3) {
        let curr = [];
        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 3; l++) {
            curr.push(arr[t + k][j + l]);
          }
        }
        res.push(curr);
      }
    }
    return res;
  }
  normalHints(hint: any){
    const arr: any = [];
    const btns = [];
    for(let i = 0; i < this.slot.length; i+=9){
      arr.push(this.slot.slice(i, i + 9));
    }
    for(let j = 0; j < arr.length; j++){
      const eachArr = arr[j];
      eachArr.forEach((obj: any) => {
        this.allBtns.push(obj.nativeElement);
      })
    }
    for(let l = 0; l < this.allBtns.length; l+=9){
      btns.push(this.allBtns.slice(l, l+9))
    }
    for(let k = 0; k < hint.length; k++){
      for(let t = 0; t < hint[k].length; t++){
        if(hint[k][t] !== '-'){
          btns[k][t].innerHTML = hint[k][t];
          this.filledSlots++;
        }
      }
    }
    return btns;
  }
  rotateMatrix90(arr: any){
    const n = arr.length;
    let rotated = Array.from(Array(n), () => Array.from(Array(n)));

    for(let i = 0; i < n ; i++){
      for(let j = 0; j < n; j++){
        let ele = arr[i][j];
        let idx = n - (i + 1);

        rotated[j][idx] = ele;
      }
    }
    return rotated;
  }
  rotateMatrix180(arr: any){
    const n = arr.length;
    let rotated = Array.from(Array(n), () => Array.from(Array(n)));

    for(let i = n - 1; i >= 0; i--){
      for(let j = n - 1; j >= 0; j--){
        rotated[i][j] = arr[i][j];
      }
    }
    return rotated;
  }
}
interface Hint {
  0: {
    Q: any[],
    A: any[],
  },
  1: {
    Q: any[],
    A: any[],
  }
}