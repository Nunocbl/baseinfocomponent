import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'editablefield',
  templateUrl: './editablefield.component.html',
  styleUrls: ['./editablefield.component.scss']
})
export class EditablefieldComponent implements OnInit {

  constructor() { }
  text:string = '';
  @Input('placeholder') placeholder:string ='';
  @Output() changeField = new EventEmitter<string>()

  ngOnInit(): void {
  }

  sendBack(value: any) {
    this.changeField.emit(value);
}

}
