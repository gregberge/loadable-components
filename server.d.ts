// TypeScript Version: 2.4

import * as React from 'react';

export function getLoadableState(
  rootElement: React.ReactElement<{}>,
  rootContext?: any,
  fetchRoot?: boolean,
  tree?: any,
): Promise<DeferredState>;

export interface DeferredState {
  getScriptContent(): string;
  getScriptTag(): string;
  getScriptElement(): React.ReactHTMLElement<HTMLScriptElement>;
}
