'use client'
import MonacoEditor from '@monaco-editor/react';
import { useState } from 'react';
import { lintCode } from '../utils/apiHelper';
const Editor = () => {
  const [code, setCode] = useState('');
  const [lintResults, setLintResults] = useState<{message:string; ruleId:string; column:number; endColumn:number}[] | null>(null);

  const handleLint = async () => {
    try {
      const result = await lintCode(code);
      console.log(result.review)
      setLintResults(result.review);
    } catch (error) {
      console.error('Error linting code:', error);
    }
  };

  return (
    <article className='w-full'>
     <MonacoEditor
        height="300px"
        defaultLanguage="typescript"
        onChange={(value:string | undefined) => setCode(value || '')}
        theme="vs-dark"
      />
        <button
        onClick={handleLint}
        className="w-full bg-blue-500 text-white p-2 rounded mb-4 disabled:bg-gray-400"
      >
        LINT CODE
      </button>
      {lintResults && lintResults.length > 0 && (
        <div>
          <h3>Lint Results:</h3>
          <ul>
            {lintResults.map((lintResult, index) => (
              <li key={index}>
                <p>ruleId : {lintResult.ruleId}</p>
                <p>column : {lintResult.column}</p>
                <p>endColumn : {lintResult.endColumn}</p>
                <p>message : {lintResult.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default Editor;
