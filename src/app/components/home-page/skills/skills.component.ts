import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  imports: [
    MatProgressBarModule,
    AngularSvgIconModule,
  ],
})
export class SkillsComponent {
  env = environment;
  ngOnInit(): void {
  }
}
