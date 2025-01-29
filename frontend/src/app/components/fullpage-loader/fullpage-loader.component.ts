import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullpage-loader',
  templateUrl: './fullpage-loader.component.html'
})
export class FullpageLoaderComponent {
  @Input() loading!: boolean;
}
