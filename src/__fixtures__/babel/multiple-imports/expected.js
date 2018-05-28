import React from 'react';
import loadable from 'loadable-components';

const What = loadable((() => {
  const fn = async () => {
    const { default: DeepWord } = await import('./DeepWorld');
    const { default: DeepAmazing } = await import('./DeepAmazing');
    return () => React.createElement(
      React.Fragment,
      null,
      React.createElement(DeepAmazing, null),
      ' ',
      React.createElement(DeepWord, null)
    );
  };

  fn.modules = ['./DeepWorld', './DeepAmazing'];
  return fn;
})());

export default What;
