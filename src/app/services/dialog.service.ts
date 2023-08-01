import {Component, ElementRef, Injectable, Injector} from '@angular/core';
import {ComponentType, Overlay, PositionStrategy} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {DialogRef} from "@angular/cdk/dialog";

export interface DialogConfig{
  data?: any
}

@Injectable()
export class DialogService {

  constructor(private overlay: Overlay, private injector: Injector){

  }
  openDialogOnElementRef(elementRef: ElementRef, dialogComponent: ComponentType<any>, dialogConfig: DialogConfig){
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(elementRef)
      .withPositions([{originX: "start", originY: "top", overlayY: "top", overlayX: "start"}]);
    console.log(positionStrategy);
    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      hasBackdrop: true,
    });

    const dialogRef = new DialogRef(overlayRef, {});

    const portal = new ComponentPortal(dialogComponent);
    overlayRef.attach(portal);

    return dialogRef;
  }

}
