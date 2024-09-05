import Header from './Header';
import { PropsWithChildren } from 'react';

export default function AppLayout(props: PropsWithChildren) {
  return (
    <div>
      <Header />

      <div className="max-w-screen-2xl relative m-auto">{props.children}</div>
    </div>
  );
}
