import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    TooltipModule
  ],
})
export class ContactComponent {
  env = environment;
}
