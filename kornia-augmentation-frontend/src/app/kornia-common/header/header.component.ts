import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kornia-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() shrink;

  constructor() { }

  ngOnInit() {
  }

}
