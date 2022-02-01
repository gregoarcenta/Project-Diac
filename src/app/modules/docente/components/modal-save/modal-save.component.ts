import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-save',
  templateUrl: './modal-save.component.html',
  styleUrls: ['./modal-save.component.css']
})
export class ModalSaveComponent implements OnInit {

  @Input() nombre: string = ''
  @Input() apellido: string = ''
  @Input() usuario: string = ''
  @Input() showModal: boolean = false

  @Output() hiddenModalEvent: EventEmitter<boolean> = new EventEmitter()
  @Output() submitDocenteFormEvent: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  guardarDocente() {
    this.submitDocenteFormEvent.emit('')
  }

  hiddenModal() {
    this.hiddenModalEvent.emit(false)
  }

}
