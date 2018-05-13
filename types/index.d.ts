// TypeScript Version: 2.4
// export as namespace LoadableComponents;

declare module 'loadable-components' {
  import * as React from 'react';

  interface DefaultImportedComponent<P> {
    default: React.ComponentType<P>;
  }

  type DefaultComponent<P> = React.ComponentType<P> | DefaultImportedComponent<P>;

  export interface ComponentTracker {
    track: (component: React.Component, modules: any, index?: number) => number;

    get: (id: number) => React.ComponentType;
    getAll: () => { [key: number]: React.ComponentType };
    reset: () => void;
  }

  export interface LoadableOptions<T> {
    ErrorComponent?: React.ComponentType;
    LoadingComponent?: React.ComponentType;
    render?: (options: { loading: boolean, error: boolean, ownProps: T, Component: React.ComponentType<T> }) => React.ReactElement<T>;
    modules?: any;
  }

  interface Loadable<T> extends React.ComponentClass<T> {
    Component: React.ComponentClass;
    loadingPromise: Promise<any>;
    load(): Promise<any>;
  }

  export const componentTracker: ComponentTracker;
  export const LOADABLE: string;

  export function loadComponents(): Promise<any>;

  export function getState(): { __LOADABLE_STATE__: { children: Array<{ id: number }> } };

  export default function loadable<T>(
    getComponent: () => Promise<DefaultComponent<T>>,
    options?: LoadableOptions<T>
  ): Loadable<T>;
}

declare module 'loadable-components/server' {
  import * as React from 'react';

  export function getLoadableState(
    rootElement: React.ReactElement<{}>,
    rootContext?: any,
    fetchRoot?: boolean,
    tree?: any,
  ): Promise<any>;
}
