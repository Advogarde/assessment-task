import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-input',
  templateUrl: './signature-input.component.html',
  styleUrls: ['./signature-input.component.scss']
})
export class SignatureInputComponent {
  signatureNeeded: boolean = true;
  signaturePad: SignaturePad | undefined;
  @ViewChild('canvas') canvasEl: ElementRef<HTMLCanvasElement> | undefined;
  signatureImg: string = '';

  constructor(private router: Router){}

ngAfterViewInit() {
  if (this.canvasEl) {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }
}

clearPad() {
  if (this.signaturePad) {
    this.signaturePad.clear();
  }
}

savePad() {
  if (this.signaturePad) {
    this.signatureImg = this.signaturePad.toDataURL();
  }
}
async submitSignature() {
  if (this.signaturePad) {
      const signatureData = this.signaturePad.toDataURL();
      try {
          const response = await fetch('http://localhost:1337/savesignature', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json', 
              },
              body: JSON.stringify({ data_uri: signatureData.split(',')[1] }),
          });
          
          if (response.ok) {
                alert('Your details saved successfully \n We will contact you as soon as possible');
                this.signaturePad.clear();
                this.router.navigate(['managenodes']); 
          } else {
              console.error('Failed to save signature');
          }
      } catch (error) {
          console.error('Error saving signature:', error);
      }
  }
}

}
