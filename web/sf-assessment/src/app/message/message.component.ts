import { Component, Input } from '@angular/core';
import {Answer, ChatMessage} from '../parser/types';
import { FormControl } from '@angular/forms';
import { ProcessParser } from '../parser/process-parser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message?: ChatMessage;

  @Input() last: boolean = false;

  @Input() parser?: ProcessParser;

  control = new FormControl();
  @Input() prevAnswers!: Answer[];

  sendAnswer() {
    this.parser?.reply({
      content: {
        value: this.control.value
      },
      id: `${this.message?.id}_reply`
    });
  }

  deleteAnswer(answer: any) {
    const index = this.prevAnswers.indexOf(answer);
    if (index > -1) {
      this.prevAnswers.splice(index, 1);
    }

    this.deleteAnswerFromBackend(answer);
  }

  deleteAnswerFromBackend(answer: any) {
    // TODO: Implement this method to send a DELETE request to your backend
  }

}
