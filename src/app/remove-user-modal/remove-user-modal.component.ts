import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-remove-user-modal',
  templateUrl: './remove-user-modal.component.html',
  styleUrls: ['./remove-user-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RemoveUserModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
