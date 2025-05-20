
import React from 'react';
import CodeButton from './CodeButton';
import { CodeData } from '@/data/codeMatchData';

interface CodeColumnProps {
  title: string;
  codeType: 'icd' | 'cpt';
  codes: CodeData[];
  onCodeHover?: (codeId: string, isHovering: boolean) => void;
  className?: string;
}

const CodeColumn: React.FC<CodeColumnProps> = ({ 
  title, 
  codeType, 
  codes, 
  onCodeHover,
  className = ""
}) => {
  return (
    <div className={className}>
      <div className="text-gray-500 mb-2 text-sm">{title}</div>
      <div className="space-y-3">
        {codes.map((codeData) => (
          <div 
            key={codeData.id} 
            className="flex items-center"
            onMouseEnter={() => onCodeHover?.(codeData.id, true)}
            onMouseLeave={() => onCodeHover?.(codeData.id, false)}
          >
            <CodeButton 
              code={codeData.code} 
              type={codeType} 
              isMatched={codeData.matched}
              id={codeData.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeColumn;
