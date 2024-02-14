import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Answer} from "../../parser/types";

@Component({
  selector: 'app-signing-pad',
  templateUrl: './signing-pad.component.html',
  styleUrls: ['./signing-pad.component.scss']
})
export class SigningPadComponent implements AfterViewInit {
  @ViewChild('signPad') signPad!: ElementRef<HTMLCanvasElement>;
  @Input() prevAnswers!: Answer[];
  @Output() signatureSaved = new EventEmitter<string>();
  strokeColor = '#000';
  private signatureImg!: string;
  private sigPadElement: any;
  private context: any;
  private isDrawing!: boolean;

  public ngAfterViewInit(): void {
    this.sigPadElement = this.signPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');

    this.context.strokeStyle = this.strokeColor;
  }

  onMouseDown(e: any): void {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: any): void {
    this.isDrawing = false;
  }

  onMouseMove(e: any): void {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  clearSignature(): void {
    this.signatureImg = '';
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  saveSignature(): void {
    this.signatureImg = this.sigPadElement.toDataURL('image/png');
    this.signatureSaved.emit(this.signatureImg);
  }

  private relativeCoords(event: any): { x: number, y: number } {
    const bounds = event.target.getBoundingClientRect();
    const cords = {
      clientX: event.clientX || event.changedTouches[0].clientX,
      clientY: event.clientY || event.changedTouches[0].clientY
    };
    const x = cords.clientX - bounds.left;
    const y = cords.clientY - bounds.top;
    return {x, y};
  }
}
