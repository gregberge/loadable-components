import * as React from 'react';

const PageWithParam:React.FC<{x: number}> = ({x}) => (<span>I am lazy page2 -{x||"missed prop"}-</span>);

export default PageWithParam;