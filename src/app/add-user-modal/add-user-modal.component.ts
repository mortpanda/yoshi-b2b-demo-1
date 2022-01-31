import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
