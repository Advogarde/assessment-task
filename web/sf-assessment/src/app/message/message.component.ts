import { Component, Input } from '@angular/core';
import { ChatMessage } from '../parser/types';
import { FormControl } from '@angular/forms';
import { ProcessParser } from '../parser/process-parser';
import { nodeNames } from '../node/node-names'; 

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message?: ChatMessage;

  @Input() last: boolean = false;

  @Input() parser?: ProcessParser;
  nodeName = nodeNames;
  nodeType: any = this.nodeName['PromptNode'];

  control = new FormControl();
    ngOnInit() {
      this.nodeType = this.message?.id.split('_')[0]
    }
  async sendAnswer() { 
    this.parser?.reply({
      content: {
        value: this.control.value
      },
      id: `${this.message?.id}_reply`
    })
    try {
      const response = await fetch(`http://localhost:1337/update-node/${this.message?.associatedBlock?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: { value: this.control.value } })
      });
      if (response.ok) {
        console.log('Node updated successfully');
      } else {
        console.error('Failed to update node');
      }
    } catch (error) {
      console.error('Error updating node:', error);
    }
  }
}
