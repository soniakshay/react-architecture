
import * as React from 'react';
import {

  Drawer, Position, Classes,
} from '@blueprintjs/core';
import { forwardRef, ReactNode, useImperativeHandle, useState } from 'react';



interface SideDrawerProps {
  ref: any,
  autoFocus?: boolean,
  canEscapeKeyClose?: boolean,
  canOutsideClickClose?: boolean,
  enforceFocus?: boolean,
  hasBackdrop?: boolean,
  position?:any,
  size?: any,
  usePortal?: boolean,
  children?: ReactNode,
  onClose?: () => void,
  title?: String,
  footer? : ReactNode,
}

const SideDrawer = (props: SideDrawerProps, ref) => {
  const [isOpen, setOpen] = useState(false);
  const defaultProps = {
    autoFocus : true,
    canEscapeKeyClose :  true,
    canOutsideClickClose :  true,
    enforceFocus :  true,
    hasBackdrop :  true,
    position :  Position.RIGHT,
    size :  undefined,
    usePortal : true,
    transitionDuration:900,
    ...props,
  };

  const openSideBar = () =>  {
    setOpen(true);
  };
  const  closeSideBar = () =>  {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({

    open() {
      openSideBar();
    },

    close(){
      closeSideBar();
    },

  }));


  return (
    <Drawer
      className={'test'}
      onClose={ () => {
        closeSideBar();
      }}
      isOpen={isOpen}
      {...defaultProps}

    >

      <div className={Classes.DRAWER_BODY}>
        {/* HACKHACK: strange use of unrelated dialog class, should be refactored */}
        <div className={Classes.DIALOG_BODY}>
          {props.children}
        </div>
      </div>


      {
        props?.footer ? (
          <div className={Classes.DRAWER_FOOTER}>

            {props.footer}
          </div>
        ) : ''
      }
    </Drawer>
  );


};

export default forwardRef(SideDrawer);
