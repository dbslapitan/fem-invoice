import {Component, ElementRef, Injectable, Injector} from '@angular/core';
import {
  ComponentType,
  Overlay,
  OverlayOutsideClickDispatcher,
  PositionStrategy,
  ScrollStrategyOptions
} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {DialogRef} from "@angular/cdk/dialog";

export interface DialogConfig{
  data?: any
}

@Injectable({
  providedIn: "root"
})
export class DialogService {

  constructor(private overlay: Overlay, private injector: Injector, private scrollStrategy: ScrollStrategyOptions, private overlayOutsideClick: OverlayOutsideClickDispatcher){

  }
  openDialogOnElementRef(elementRef: ElementRef, dialogComponent: ComponentType<any>, dialogConfig: DialogConfig){
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(elementRef)
      .withPositions([{originX: "start", originY: "top", overlayY: "top", overlayX: "start"}]);
    const overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      hasBackdrop: true,
      scrollStrategy: this.scrollStrategy.block(),
    });

    const dialogRef = new DialogRef(overlayRef, {id: "editInvoice"});

    const portal = new ComponentPortal(dialogComponent);
    overlayRef.attach(portal);

    return dialogRef;
  }

}
