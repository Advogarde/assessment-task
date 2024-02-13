import {Component, Input} from '@angular/core';
import {Answer, ChatMessage} from '../parser/types';
import {FormControl} from '@angular/forms';
import {ProcessParser} from '../parser/process-parser';
import {AnswerService} from "../services/answer.service";

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

  constructor(private answerService: AnswerService) {

  }

  sendAnswer() {
    console.log(this.message);
    this.parser?.reply({
      content: {
        value: this.control.value
      },
      id: `${this.message?.id}_reply`
    });

    this.addAnswerToBackend(this.control.value).subscribe(
      {
        next: (answer) => {
          console.log('Answer added', answer);
        },
        error: (error) => {
          alert('Error adding answer' + error.message);
        }
      }
    );
  }

  deleteAnswer(answer: any) {
    this.deleteAnswerFromBackend(answer).subscribe(
      {
        next: () => {
          // Remove answer from prevAnswers
          const index = this.prevAnswers.indexOf(answer);
          if (index > -1) {
            this.prevAnswers.splice(index, 1);
          }
        },
        error: (error) => {
          alert('Error deleting answer' + error.message);
        }
      }
    );
  }

  deleteAnswerFromBackend(answer: any) {
    const node_id = this.message?.associatedBlock?.id ?? '';

    return this.answerService.deleteAnswer(answer, node_id)
  }

  private addAnswerToBackend(answerText: string) {
    const node_id = this.message?.associatedBlock?.id ?? '';

    return this.answerService.addAnswer(answerText, node_id);
  }
}
