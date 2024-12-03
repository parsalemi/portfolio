import { AfterViewChecked, AfterViewInit, Component, ViewChildren } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-sudoku',
  standalone: true,
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss'],
  imports: [
    NgForOf
  ],
})
export class SudokuComponent implements AfterViewInit, AfterViewChecked {
  @ViewChildren('slot') slots: any;
  public slot: any;
  public cellNumber: any;
  public selectedCell: any = [];
  public columnsObj: any = {};
  public rowsArr: any = [];
  public allRows: any = []
  public allColumns: any = [];
  public values: any = [];
  public allBtns: any = [];
  public hintNumbers = [
      [9, '-', '-', 4, '-', '-', '-', '-', '-'],
      [4, '-', '-', '-', '-', '-', 9, '-', '-'],
      ['-', '-', 3, '-', 9, 8, '-', '-', 7],
      [7, 6, '-', '-', 2, '-', '-', '-', '-'],
      ['-', 3, '-', '-', 8, '-', '-', 7, '-'],
      ['-', '-', '-', '-', 1, '-', '-', 3, 2],
      [3, '-', '-', 2, 4, '-', 8, '-', '-'],
      ['-', '-', 1, '-', '-', '-', '-', '-', 6],
      ['-', '-', '-', '-', '-', 6, '-', '-', 9]
  ];
  public placeHints = [ 
    () => this.normalHints(this.hintNumbers), 
    () => this.normalHints(this.rotateMatrix90(this.hintNumbers)),
  ];
  placeNumber(number: number | string){
    this.cellNumber = number;
    for(let i = 0; i < this.slot.length; i++){
      const button = this.slot[i].nativeElement;
      if(button.innerHTML == number){
        button.style.backgroundColor = 'white';
      }else{
        button.style.backgroundColor = 'transparent'
      }
    }
  }
  setNumber(cell: any, number: number | string, event: any){
    if(number === 'erase'){
      cell.innerHTML = '-';
    }else{
      cell.innerHTML = number;
      
      if(this.columnsObj[event.target.dataset.x]){
        let a = this.columnsObj[event.target.dataset.x];
        a.push(number);
        this.columnsObj[event.target.dataset.x] = a;
        a = [];
      }else{
        this.rowsArr.push(number);
        this.columnsObj[event.target.dataset.x] = this.rowsArr;
        this.rowsArr = [];
      }
    }
  }
  getColumn(){
    
    for(let i = 0; i < this.slot.length; i+=9){
      const cell = this.slot[i].nativeElement;
      this.columnsObj.push(cell);
    }
  }
  ngAfterViewInit(): void {
    this.slot = this.slots._results;
    this.slot.forEach( (event: any) => {
      const cells = event.nativeElement;
      cells.addEventListener('click' , (e: any) => {
        this.selectedCell.push(e.target);
        this.setNumber(this.selectedCell.pop(), this.cellNumber, cells.dataset.x);
      })
    });
    // this.normalHints();
    const randomNumber = Math.floor(Math.random() * 2);
    // this.placeHints[randomNumber]();
    this.placeHints[0]();
    this.rotateMatrix180(this.hintNumbers);
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
        btns[k][t].innerHTML = hint[k][t];
      }
    }
  }
    
  checkRows(){
    const rows = this.allRows;
    const values = [];
    const allRow = [];
    for(let i = 0; i < rows.length; i++){
      for(let j = 0; j < rows[i].length; j++){
        const number = rows[i][j];
        values.push(number.innerHTML);
      }
    }
    for(let k = 0; k < values.length; k+=9){
      allRow.push(values.slice(k, k+9))
    }
    allRow.forEach( (row: any) => {
      for(let h = 0; h < row.length; h++){
        row.sort();
        if(row[h] == row[h+1] && row[h] !== '-'){
          //show error
          alert('wrong number');

        }
      }  
    })
  }
  checkCols(){
    const cols = this.allColumns;
    const values = [];
    const allCols = [];
    for(let i = 0; i < cols.length; i++){
      for(let j = 0; j < cols[i].length; j++){
        const number = cols[i][j];
        values.push(number.innerHTML);
      }
    }
    for(let k = 0; k < values.length; k+=9){
      allCols.push(values.slice(k, k+9));
    }
    allCols.forEach( (col: any) => {
      for(let h = 0; h < col.length; h++){
        col.sort();
        if(col[h] == col[h+1] && col[h] !== '-'){
          // show error
          
          
        }
      }
    })
  }
  checkSquare(){
    

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
    // this.normalHints(rotated)
  }
  rotateMatrix180(arr: any){
    const n = arr.length;
    let rotated = Array.from(Array(n), () => Array.from(Array(n)));

    for(let i = n - 1; i >= 0; i--){
      for(let j = n - 1; j >= 0; j--){
        rotated[i][j] = arr[i][j];
      }
    }
    console.log(rotated);
    return rotated;
  }

  ngAfterViewChecked(): void {
    this.allColumns = [];
    this.allRows = [];
    for(let i = 1; i < 10; i++){
      const columns = document.querySelectorAll(`button[data-y='${i}']`);
      this.allColumns.push(columns);
      const rows = document.querySelectorAll(`button[data-x='${i}']`);
      this.allRows.push(rows);
    }
    this.checkRows();
    this.checkCols();
  }
}
