import {Component, Input} from '@angular/core';
import {Node} from '../../../models/node';


@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g
      [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
        *ngIf="isLeaf()"
        class="node"
        fill="#999"
        [attr.cx]="node.x"
        [attr.cy]="node.y"
        r="3"
        text-anchor="end">
      </svg:circle>
      <svg:circle
        *ngIf="!isLeaf()"
        class="node"
        fill="#555"
        [attr.cx]="node.x"
        [attr.cy]="node.y"
        r="3"
        text-anchor="end">
      </svg:circle>
      <svg:text *ngIf="isLeaf()"
        class="node-name"
        font-size="1em"
        [attr.x]="node.x + 6"
        [attr.y]="node.y"
        text-anchor="start"
        dy="0.31em">
        {{node.data.description}}
      </svg:text>
      <svg:text *ngIf="!isLeaf()"
        class="node-name"
        font-size="1em"
        [attr.x]="node.x - 6"
        [attr.y]="node.y"
        text-anchor="end"
        dy="0.31em">
        {{node.data.description}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: any;
  @Input('leafNodes') leafNodes: [string];

  isLeaf() {
    if (this.leafNodes.indexOf(this.node.id)  > -1) {
      return true;
    } else {
      return false;
    }
  }
}
