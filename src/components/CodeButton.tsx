
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeButtonProps {
  code: string;
  type: 'icd' | 'cpt';
  className?: string;
  isMatched?: boolean;
  id?: string;
  description?: string;
}

const CodeButton: React.FC<CodeButtonProps> = ({ 
  code, 
  type, 
  className,
  isMatched = false,
  id,
  description
}) => {
  const baseStyles = "px-3 py-2 rounded-md text-white font-medium text-sm transition-all duration-300 shadow-sm";
  
  const typeStyles = {
    icd: "bg-icd hover:bg-icd-dark border border-icd-light",
    cpt: "bg-cpt hover:bg-cpt-dark border border-cpt-light"
  };

  // Different match indicator colors based on code type
  const matchRingColor = type === 'cpt' 
    ? "ring-icd" // Use primary blue for CPT matches
    : "ring-match"; // Keep green for ICD matches

  return (
    <div className="flex flex-col">
      <div 
        id={id}
        className={cn(
          baseStyles,
          typeStyles[type],
          isMatched ? `ring-2 ${matchRingColor} ring-offset-1` : "",
          "relative inline-flex items-center justify-center",
          className
        )}
      >
        <span>{code}</span>
        {isMatched && (
          <span className={`absolute -top-1 -right-1 h-3 w-3 ${type === 'cpt' ? 'bg-icd' : 'bg-match'} rounded-full animate-fade-in`} />
        )}
      </div>
      {description && (
        <div className={`text-xs mt-1 max-w-[200px] text-gray-600 italic ${type === 'cpt' ? 'text-right' : 'text-left'}`}>
          {description}
        </div>
      )}
    </div>
  );
};

export default CodeButton;
