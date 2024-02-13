import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Answer} from "../parser/types";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private url = '/api/answers/';

  constructor(private http: HttpClient) {
  }

  addAnswer(answerText: string, node_id: string) {
    return this.http.post(this.url + `${node_id}`, {text: answerText});
  }

  deleteAnswer(answer: Answer, node_id: string) {
    return this.http.delete(this.url + `${node_id}/${answer.id}`);
  }
}
