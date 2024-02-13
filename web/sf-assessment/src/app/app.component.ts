import {Component, OnInit} from '@angular/core';
import {ProcessParser} from './parser/process-parser';
import {SketchParser} from './sketch-parser';
import {Answer, ChatMessage} from './parser/types';
import {tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public parser: ProcessParser = new ProcessParser();

  messages: ChatMessage[] = [];
  prevAnswers: { [msgId: string]: Answer[] } = {};

  constructor() {
    this.parser.reset();
    this.parser.onMessage
      .pipe(
        tap((msgList) => this.getChatPrevAnswers(msgList))
      )
      .subscribe((chat: ChatMessage[]) => {
        this.messages = chat;
      });
  }

  ngOnInit(): void {
    this.getProcess().then(_ => console.log("Process loaded"));
  }

  private getChatPrevAnswers(msgList: ChatMessage[]) {
    msgList.forEach((msg: ChatMessage) => {
      this.prevAnswers[msg.id] = [];
      const blockId = msg.associatedBlock?.id;
      if (!blockId) return;
      const node = this.parser.thread?.nodeTemplate.find(n => n._id === blockId);
      if (!node) return;
      this.prevAnswers[msg.id] = node.answers;
    })
  }

  private async getProcess() {
    const nodes = await fetch(`http://localhost:5000/process`).then(resp => resp.json());
    this.parser.setupThread(nodes.map((n: any) => ({
      ...n,
      node: SketchParser.buildNode(n.type, n.config)
    })));
    this.parser.start(() => {
      alert('Process finished!');
    });
  }
}
