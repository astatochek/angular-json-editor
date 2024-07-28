import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Content, JSONEditor } from 'vanilla-jsoneditor';

@Component({
  selector: 'json-editor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div #json_editor></div> `,
})
export class JsonEditorComponent {
  json = input.required<object>();
  change = output<object>();
  editor = viewChild<ElementRef>('json_editor');

  constructor() {
    effect((onCleanup) => {
      const editor = this.editor();
      const json = this.json();
      if (editor) {
        const ref = this.setEditor(editor.nativeElement, { json });
        onCleanup(() => ref.$destroy());
      }
    });
  }

  setEditor(target: Element, content: Content): JSONEditor {
    return new JSONEditor({
      target,
      props: {
        content,
        onChange: (content) => {
          this.change.emit((content as any).json);
        },
      },
    });
  }
}
