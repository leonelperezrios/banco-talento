import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Icon } from '../../../ui/icon/icon';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, Icon],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.css',
})
export class Breadcrumb {
  @Input() pageTitle: string = '';
}
