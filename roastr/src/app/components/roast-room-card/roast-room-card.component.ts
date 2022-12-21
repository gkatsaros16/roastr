import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-roast-room-card',
  templateUrl: './roast-room-card.component.html',
  styleUrls: ['./roast-room-card.component.scss']
})
export class RoastRoomCardComponent implements OnInit {
  @Input() model;
  constructor() { }

  ngOnInit(): void {
  }

  getClass(value) {
    switch (value) {
      case 0:
        return "text-bg-danger"
      case 1:
        return "text-bg-primary"
        break; 
      default:
        break;
    }
  }

  getTag(value) {
    switch (value) {
      case 0:
        return "HOT"
      case 1:
        return "Trending"
        break; 
      default:
        break;
    }
  }
}
