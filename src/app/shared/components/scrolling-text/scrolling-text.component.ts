import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrls: ['./scrolling-text.component.scss']
})
export class ScrollingTextComponent implements OnInit {
  @Input('content') content:string = ``;
  @Input('_class') _class:string = ``;
  @Input('content_class') content_class:string = ``;
  constructor() { }

  ngOnInit(): void {
  }

}

