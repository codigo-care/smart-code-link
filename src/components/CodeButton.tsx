
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeButtonProps {
  code: string;
  type: 'icd' | 'cpt';
  className?: string;
  isMatched?: boolean;
  id?: string;
}

const CodeButton: React.FC<CodeButtonProps> = ({ 
  code, 
  type, 
  className,
  isMatched = false,
  id
}) => {
  const baseStyles = "px-3 py-2 rounded-md text-white font-medium text-sm transition-all duration-300 shadow-sm";
  
  const typeStyles = {
    icd: "bg-icd hover:bg-icd-dark border border-icd-light",
    cpt: "bg-cpt hover:bg-cpt-dark border border-cpt-light"
  };

  return (
    <div 
      id={id}
      className={cn(
        baseStyles,
        typeStyles[type],
        isMatched ? "ring-2 ring-match ring-offset-1" : "",
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <span>{code}</span>
      {isMatched && (
        <span className="absolute -top-1 -right-1 h-3 w-3 bg-match rounded-full animate-fade-in" />
      )}
    </div>
  );
};

export default CodeButton;
