import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivityFormComponent } from "./activity-form/activity-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ActivityFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'report-system';
}
