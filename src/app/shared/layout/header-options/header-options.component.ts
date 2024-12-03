import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header-options',
  standalone: true,
  templateUrl: './header-options.component.html',
  styleUrls: ['./header-options.component.scss'],
  imports: [
    MenuModule,
    ButtonModule,
    MatButtonModule,
    MatIconModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderOptionsComponent implements OnInit{
  settingsOpt: MenuItem[] | undefined;
  @Output() darkMode = new EventEmitter();

  ngOnInit(): void {
    this.settingsOpt = [
      {
        label: 'Options',
        items: [
          {
            label: 'Dark/Light',
            icon: 'pi pi-moon',
            command: () => this.darkMode.emit(),
          }
        ]
      }
    ]    
  }
}
