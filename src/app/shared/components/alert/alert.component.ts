import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message!: string
  @Input() typeAlert!: string
  @Output() hiddenAlertEvent: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  hiddenAlert() {
    this.hiddenAlertEvent.emit(false)
  }

}
