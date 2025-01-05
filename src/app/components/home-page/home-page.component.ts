import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    MatIconModule,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent
  ],
})
export class HomePageComponent{
  env = environment;
}
