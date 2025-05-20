
import React, { useEffect, useRef, useState } from 'react';
import { demoData } from '@/data/codeMatchData';
import CodeColumn from './CodeColumn';
import ConnectionLines from './ConnectionLines';

interface LineInfo {
  id: string;
  icdId: string;
  cptId: string;
  active: boolean;
}

const CodeMatchDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeLines, setActiveLines] = useState<LineInfo[]>([]);

  useEffect(() => {
    // Delay drawing lines for animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Prepare lines info
  useEffect(() => {
    if (!isVisible) return;
    
    const linesInfo = demoData.matches.map((match, index) => ({
      id: `line-${index}`,
      icdId: match.icd,
      cptId: match.cpt,
      active: false
    }));
    setActiveLines(linesInfo);
  }, [isVisible]);

  // Handle hover on ICD codes
  const handleCodeHover = (codeId: string, isHovering: boolean) => {
    setActiveLines(prev => 
      prev.map(line => 
        line.icdId === codeId 
          ? { ...line, active: isHovering } 
          : line
      )
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative border border-gray-200 rounded-xl bg-white shadow-lg p-6"
    >
      <div className="text-xl font-semibold mb-1 text-company-primary">Patient Assessment</div>
      <div className={`absolute top-6 right-6 text-sm font-medium ${isVisible ? "text-company-secondary animate-fade-in" : "opacity-0"}`}>
        AI Matched
      </div>
      
      <div className="grid grid-cols-2 gap-8 mt-4">
        {/* ICD Codes Column */}
        <CodeColumn 
          title="ICD Codes" 
          codeType="icd" 
          codes={demoData.icdCodes} 
          onCodeHover={handleCodeHover}
        />
        
        {/* CPT Codes Column */}
        <CodeColumn 
          title="CPT Codes" 
          codeType="cpt" 
          codes={demoData.cptCodes}
          className="flex flex-col items-end" // Right align the CPT column
        />
      </div>
      
      {/* SVG layer for connection lines */}
      {isVisible && (
        <ConnectionLines 
          matches={demoData.matches}
          activeLines={activeLines}
          containerRef={containerRef}
        />
      )}
    </div>
  );
};

export default CodeMatchDemo;
