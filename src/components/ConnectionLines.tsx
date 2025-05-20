
import React from 'react';
import { MatchData } from '@/data/codeMatchData';

interface LineInfo {
  id: string;
  icdId: string;
  cptId: string;
  active: boolean;
}

interface ConnectionLinesProps {
  matches: MatchData[];
  activeLines: LineInfo[];
  containerRef: React.RefObject<HTMLDivElement>;
}

const ConnectionLines: React.FC<ConnectionLinesProps> = ({ 
  matches, 
  activeLines,
  containerRef 
}) => {
  const [lines, setLines] = React.useState<JSX.Element[]>([]);
  
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    // Draw connection lines between matched codes
    const drawLines = () => {
      if (!containerRef.current) return;
      
      const newLines: JSX.Element[] = [];
      
      matches.forEach((match, index) => {
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
  }, [matches, activeLines, containerRef]);

  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
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
  );
};

export default ConnectionLines;
