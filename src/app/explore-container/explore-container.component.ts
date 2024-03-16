import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
@Output() scan = new EventEmitter<boolean>;
  @Input() name?: string;

  scanItem(){
    this.scan.emit(true);
  }
}
