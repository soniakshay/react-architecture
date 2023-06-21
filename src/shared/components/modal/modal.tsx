import React, { ReactNode } from 'react';
import { Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';

interface ModalProps {
  title?: string,
  children?: ReactNode,
  footer?:ReactNode,
  isOpen:boolean,
  closeDialog: any,
  canOutsideClickClose?:  boolean,
  canEscapeKeyClose?: boolean


}

export const Modal = (
  {
    title = null,
    children = null,
    footer = null,
    isOpen =  true,
    closeDialog,
    canOutsideClickClose = true,
    canEscapeKeyClose =  true,
  }: ModalProps,

) => {

  return (

    <Dialog title={title} isOpen={isOpen} canEscapeKeyClose={canEscapeKeyClose} canOutsideClickClose={canOutsideClickClose} onClose={() => {
      closeDialog(false);
    }}>
      <DialogBody>
        {children}
      </DialogBody>

      {
        footer !== null ?  (
          <DialogFooter actions={
            <>
              {footer}
            </>
          } />

        ) : ''
      }
    </Dialog>
  );
};
