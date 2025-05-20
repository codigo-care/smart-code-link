
import React, { useEffect, useRef, useState } from 'react';
import CodeButton from './CodeButton';

interface CodeMatch {
  icd: string;
  cpt: string;
  matched: boolean;
}

interface CodeData {
  id: string;
  code: string;
  matched: boolean;
}

const demoData = {
  icdCodes: [
    { id: "icd-1", code: "H40.1132", matched: true },
    { id: "icd-2", code: "E11.9", matched: false },
    { id: "icd-3", code: "H35.352", matched: true },
    { id: "icd-4", code: "I10", matched: true },
    { id: "icd-5", code: "J45.909", matched: false }
  ],
  cptCodes: [
    { id: "cpt-1", code: "92134", matched: true },
    { id: "cpt-2", code: "99214", matched: false },
    { id: "cpt-3", code: "67036", matched: true },
    { id: "cpt-4", code: "93000", matched: true },
    { id: "cpt-5", code: "90471", matched: false }
  ],
  matches: [
    { icd: "icd-1", cpt: "cpt-1" },
    { icd: "icd-3", cpt: "cpt-3" },
    { icd: "icd-4", cpt: "cpt-4" }
  ]
};

const CodeMatchDemo: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<JSX.Element[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay drawing lines for animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    
    // Draw connection lines between matched codes after elements are rendered
    const drawLines = () => {
      if (!containerRef.current) return;
      
      const newLines: JSX.Element[] = [];
      
      demoData.matches.forEach((match, index) => {
        const icdElement = document.getElementById(match.icd);
        const cptElement = document.getElementById(match.cpt);
        
        if (icdElement && cptElement) {
          const icdRect = icdElement.getBoundingClientRect();
          const cptRect = cptElement.getBoundingClientRect();
          const containerRect = containerRef.current!.getBoundingClientRect();
          
          // Calculate positions relative to the container
          const x1 = icdRect.right - containerRect.left;
          const y1 = icdRect.top + icdRect.height/2 - containerRect.top;
          const x2 = cptRect.left - containerRect.left;
          const y2 = cptRect.top + cptRect.height/2 - containerRect.top;
          
          // Generate a slightly curved line
          const midX = (x1 + x2) / 2;
          const controlY = (y1 + y2) / 2 - 10; // Curve control point
          
          newLines.push(
            <path
              key={`line-${index}`}
              d={`M ${x1} ${y1} Q ${midX} ${controlY}, ${x2} ${y2}`}
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
              strokeDasharray="1000"
              className="animate-draw-line"
              markerEnd="url(#arrowhead)"
            />
          );
        }
      });
      
      setLines(newLines);
    };
    
    // Initial draw and redraw on window resize
    drawLines();
    window.addEventListener('resize', drawLines);
    
    return () => {
      window.removeEventListener('resize', drawLines);
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className="relative border border-gray-200 rounded-xl bg-white shadow-lg p-6"
    >
      <div className="text-xl font-semibold mb-1">Patient Assessment</div>
      <div className={`absolute top-6 right-6 text-sm font-medium ${isVisible ? "text-match animate-fade-in" : "opacity-0"}`}>
        AI Matched
      </div>
      
      <div className="grid grid-cols-2 gap-8 mt-4">
        {/* ICD Codes Column */}
        <div>
          <div className="text-gray-500 mb-2 text-sm">ICD Codes</div>
          <div className="space-y-3">
            {demoData.icdCodes.map((codeData) => (
              <div key={codeData.id} className="flex items-center">
                <CodeButton 
                  code={codeData.code} 
                  type="icd" 
                  isMatched={codeData.matched}
                  id={codeData.id}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* CPT Codes Column */}
        <div>
          <div className="text-gray-500 mb-2 text-sm">CPT Codes</div>
          <div className="space-y-3">
            {demoData.cptCodes.map((codeData) => (
              <div key={codeData.id} className="flex items-center">
                <CodeButton 
                  code={codeData.code} 
                  type="cpt" 
                  isMatched={codeData.matched}
                  id={codeData.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* SVG layer for connection lines */}
      <svg 
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease-in' }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
          </marker>
        </defs>
        {lines}
      </svg>
    </div>
  );
};

export default CodeMatchDemo;
