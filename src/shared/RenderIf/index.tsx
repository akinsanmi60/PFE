import { Fragment } from 'react';
import { IRenderIfProps } from 'types/modal.type';

function RenderIf({ condition, children }: IRenderIfProps) {
  if (!condition) return null;

  return <Fragment>{children}</Fragment>;
}

export default RenderIf;
