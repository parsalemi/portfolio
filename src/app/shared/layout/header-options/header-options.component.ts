import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    ButtonModule,
    MenuModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class HeaderOptionsComponent implements OnInit, OnChanges{
  settingsOpt: MenuItem[] | undefined;
  @Output() darkMode = new EventEmitter();
  @Output() purpleTheme = new EventEmitter();
  @Output() blueTheme = new EventEmitter();
  @Output() greenTheme = new EventEmitter();
  @Output() toggleAnimation = new EventEmitter();
  @Input() darkTheme: Boolean = true;
  @Input() animated: Boolean = true;

  _animated !: boolean;
  _darkTheme !: boolean;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['animated'] !== undefined){
      this._animated = changes['animated'].currentValue;
    }
    if(changes['darkTheme'] !== undefined){
      this._darkTheme = changes['darkTheme'].currentValue;
    }
    this.settingsOpt = [
      {
        label: 'Options',
        items: [
          {
            label: this._darkTheme ? 'Light' : 'Dark',
            icon: this._darkTheme ? 'pi pi-sun' : 'pi pi-moon',
            iconStyle: {color: 'var(--basic-400)'},
            command: () => this.darkMode.emit(),
          },
          {
            label: 'Border animation',
            icon: this._animated ? 'pi pi-stop-circle' : 'pi pi-play-circle',
            command: () => this.toggleAnimation.emit(),
          }
        ]
      },
      {
        label: 'Themes',
        items: [
          {
            label: 'Purple',
            icon: 'pi pi-circle-fill',
            iconStyle: {color: 'hsla(265, 65%, 40%, .7)', fontSize: '12px'},
            command: () => this.purpleTheme.emit(),
          },
          {
            label: 'Blue',
            icon: 'pi pi-circle-fill',
            iconStyle: {color: 'hsla(215, 65%, 40%, .7)', fontSize: '12px'},
            command: () => this.blueTheme.emit(),
          },
          {
            label: 'Green',
            icon: 'pi pi-circle-fill',
            iconStyle: {color: 'hsla(165, 65%, 40%, .7)', fontSize: '12px'},
            command: () => this.greenTheme.emit(),
          }
        ]
      }
    ]    

  }
  ngOnInit(): void {
    this.settingsOpt = [
      {
        label: 'Options',
        items: [
          {
            label: 'Light',
            icon: 'pi pi-sun',
            iconStyle: {color: 'var(--basic-400)'},
            command: () => this.darkMode.emit(),
          },
          {
            label: 'Border Animation',
            icon: 'pi pi-stop-circle',
            command: () => this.toggleAnimation.emit(),
          }
        ]
      },
      {
        label: 'Themes',
        items: [
          {
            label: 'Purple',
            icon: 'pi pi-circle-fill',
            iconStyle: {color: 'hsla(265, 65%, 40%, .7)', fontSize: '12px'},
            command: () => this.purpleTheme.emit(),
          },
          {
            label: 'Blue',
            icon: 'pi pi-circle-fill',
            iconStyle: {color: 'hsla(215, 65%, 40%, .7)', fontSize: '12px'},
            command: () => this.blueTheme.emit(),
          },
          {
            label: 'Green',
            icon: 'pi pi-circle-fill',
            iconStyle: {color: 'hsla(165, 65%, 40%, .7)', fontSize: '12px'},
            command: () => this.greenTheme.emit(),
          }
        ]
      }
    ]    
  }
}
