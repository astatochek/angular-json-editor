import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonEditorComponent } from './json-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<json-editor [json]="json()" (change)="onChange($event)" />`,
  imports: [JsonEditorComponent],
})
export class AppComponent {
  json = signal<object>({
    name: 'Asap',
  });

  onChange(json: object): void {
    this.json.set(json);
  }
}
