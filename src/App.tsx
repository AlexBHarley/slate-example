import React from 'react';
import logo from './logo.svg';
import './App.css';

import Editor from './editor';

function App() {
  const [value, setValue] = React.useState([
    {
      type: 'P',
      children: [{ text: '' }],
    },
  ]);
  return (
    <div>
      {/* @ts-ignore */}
      <Editor />
    </div>
  );
}

export default App;
