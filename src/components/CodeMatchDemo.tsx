
import React, { useEffect, useRef, useState } from 'react';
import CodeButton from './CodeButton';

interface LineInfo {
  id: string;
  icdId: string;
  cptId: string;
  active: boolean;
}

interface CodeData {
  id: string;
  code: string;
  matched: boolean;
}

// Updated with H-series ICD codes and one ICD with multiple matches
const demoData = {
  icdCodes: [
    { id: "icd-1", code: "H40.1132", matched: true },   // Matched to two CPT codes
    { id: "icd-2", code: "H25.13", matched: false },    // Cataract
    { id: "icd-3", code: "H35.352", matched: true },    // Macular degeneration
    { id: "icd-4", code: "H53.2", matched: true },      // Diplopia
    { id: "icd-5", code: "H57.9", matched: false }      // Unspecified disorder of eye
  ],
  cptCodes: [
    { id: "cpt-1", code: "92134", matched: true },     // OCT imaging
    { id: "cpt-2", code: "99214", matched: false },    // Office visit
    { id: "cpt-3", code: "67036", matched: true },     // Vitrectomy
    { id: "cpt-4", code: "92020", matched: true },     // Gonioscopy
    { id: "cpt-5", code: "92015", matched: true }      // Refraction
  ],
  matches: [
    { icd: "icd-1", cpt: "cpt-1" },  // H40.1132 -> 92134
    { icd: "icd-1", cpt: "cpt-4" },  // H40.1132 -> 92020 (second match)
    { icd: "icd-3", cpt: "cpt-3" },  // H35.352 -> 67036
    { icd: "icd-4", cpt: "cpt-5" }   // H53.2 -> 92015
  ]
};

const CodeMatchDemo: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<JSX.Element[]>([]);
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
          
          const isActive = activeLines.find(line => 
            line.icdId === match.icd && 
            line.cptId === match.cpt && 
            line.active
          );
          
          newLines.push(
            <path
              key={`line-${index}`}
              id={`line-${index}`}
              d={`M ${x1} ${y1} Q ${midX} ${controlY}, ${x2} ${y2}`}
              stroke={isActive ? "#ff6b6b" : "#38a883"} // Use highlight color when active
              strokeWidth={isActive ? "3" : "2"}
              fill="none"
              strokeDasharray="1000"
              className={`animate-draw-line ${isActive ? "animate-pulse-line" : ""}`}
              markerEnd={`url(#${isActive ? "arrowhead-active" : "arrowhead"})`}
              style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
            />
          );
        }
      });
      
      setLines(newLines);
    };
    
    // Initial draw and redraw on window resize or when activeLines changes
    drawLines();
    
    const resizeHandler = () => drawLines();
    window.addEventListener('resize', resizeHandler);
    
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [isVisible, activeLines]);

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
        <div>
          <div className="text-gray-500 mb-2 text-sm">ICD Codes</div>
          <div className="space-y-3">
            {demoData.icdCodes.map((codeData) => (
              <div 
                key={codeData.id} 
                className="flex items-center"
                onMouseEnter={() => handleCodeHover(codeData.id, true)}
                onMouseLeave={() => handleCodeHover(codeData.id, false)}
              >
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
            <polygon points="0 0, 10 3.5, 0 7" fill="#38a883" />
          </marker>
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff6b6b" />
          </marker>
        </defs>
        {lines}
      </svg>
    </div>
  );
};

export default CodeMatchDemo;
