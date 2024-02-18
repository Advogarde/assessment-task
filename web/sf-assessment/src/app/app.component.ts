import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProcessParser } from './parser/process-parser';
import { SketchParser } from './sketch-parser';
import { ChatMessage } from './parser/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'; 
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public parser: ProcessParser = new ProcessParser();

  messages: ChatMessage[] = [];
  hasChildRoutes: any;

  @ViewChildren("messageComp") messageComponents:any;


  constructor(private activatedRoute: ActivatedRoute,private router: Router) {
    this.parser.reset();
    this.parser.onMessage.subscribe((chat) => {
      this.messages = chat;
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.hasChildRoutes = !!this.activatedRoute.firstChild;
    });
    this.getProcess();
  }

  private async getProcess() {
    let nodes = await fetch(`http://localhost:1337/process`).then(resp => resp.json());
    this.parser.setupThread(nodes.map((n: any) => ({
      ...n,
      node: SketchParser.buildNode(n.type, n.config)
    })));
    
    this.parser.start(() => {
       nodes = nodes.map((node: any, index: any) => ({
        ...node,
        answers: this.parser.thread?.nodeTemplate[index]?.answer
       })
      )
    });
  }
  
 

}
