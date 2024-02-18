import { NONE_TYPE } from '@angular/compiler';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-nodes',
  templateUrl: './manage-nodes.component.html',
  styleUrls: ['./manage-nodes.component.scss']
})
export class ManageNodesComponent  {
    nodes: any;
    constructor(private router: Router){
      this.fetchProcessDetails(); 

    }
    async fetchProcessDetails(){
      try {
        this.nodes = await fetch(`http://localhost:1337/process`).then(resp => resp.json());
      } catch (error) {
        console.error("Error fetching nodes:", error);
      }
    }

  editNode(node: any) {
    node.editing = true; 
  }

  async saveEdit(node: any, newAnswer: any) {
    node.answers.value = newAnswer;
    node.editing = false; 
    try {
      const response = await fetch(`http://localhost:1337/update-node/${node._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: { value: newAnswer } })
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
  
  cancelEdit(node: any) {
    node.editing = false; 
  }
  async deleteAnswer(node: any) {
    try {
      const response = await fetch(`http://localhost:1337/delete-answers/${node._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        console.log('Answers for node deleted successfully'); 
        node.answers.value = ''
      } else {
        console.error('Failed to delete answers for node');
      }
    } catch (error) {
      console.error('Error deleting answers for node:', error);
    }
  }
  navigateToQuestions(){
    let answer = prompt("Are you sure to go back to questions again ?" + " (yes/no)")
    if(answer == "yes")
      this.router.navigate(['']); 
    else if (answer === "no") 
     alert("You answered no!");
    else 
     alert("invalid Answer")
  }
}
