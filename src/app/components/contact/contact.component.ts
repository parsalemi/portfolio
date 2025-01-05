import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactComponent {
  env = environment;
}
