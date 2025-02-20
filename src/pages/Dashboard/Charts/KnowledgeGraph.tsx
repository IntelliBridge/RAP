import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { recruits } from './data';
import { AlertCircle } from 'lucide-react';
import * as d3 from 'd3';

interface Node {
  id: string;
  name: string;
  value: number;
  color?: string;
  outlineColor?: string;
  label?: string;
  group?: string;
  recruitId?: string;
  uic?: number;
  category?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

interface UICWellnessAverages {
  [key: string]: number;
}

const MY_ID = "10001";

  const KnowledgeGraph = ({recruits}:{recruits: JSON}) => {
    const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
    const [error, setError] = useState<string | null>(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [highlightNodes, setHighlightNodes] = useState(new Set<string>());
    const [highlightLinks, setHighlightLinks] = useState(new Set<string>());
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const getNodeColors = (value: number) => {
      if (value > 80) {
        return { fill: '#B7F5BD', outline: '#21C834' };
      } else if (value >= 70) {
        return { fill: 'rgba(255, 159, 67, 0.5)', outline: '#DD8C3F' };
      } else {
        return { fill: '#FFB3B8', outline: '#CC4142' };
      }
    };
  
    const calculateUICWellnessAverages = (uicNumber: number) => {
      const uicRecruits = recruits.filter(recruit => recruit.uic === uicNumber);
      const averages: UICWellnessAverages = {};
      
      const categories = Object.keys(uicRecruits[0].overall_wellness);
      
      categories.forEach(category => {
        const sum = uicRecruits.reduce((acc, recruit) => {
          return acc + recruit.overall_wellness[category];
        }, 0);
        averages[category] = Math.round(sum / uicRecruits.length);
      });
      
      return averages;
    };
  
    const handleNodeClick = (node: Node) => {
      if (node.group === 'uic-wellness' || node.group === 'wellness') {
        const category = node.category;
        if (selectedCategory === category) {
          setHighlightNodes(new Set());
          setHighlightLinks(new Set());
          setSelectedCategory(null);
        } else {
          const newHighlightNodes = new Set<string>();
          const newHighlightLinks = new Set<string>();
          
          newHighlightNodes.add(node.id);
          
          graphData.links.forEach(link => {
            const source = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === link.source);
            const target = typeof link.target === 'object' ? link.target : graphData.nodes.find(n => n.id === link.target);
            
            if (source && target) {
              if ((source as Node).category === category || (target as Node).category === category) {
                newHighlightNodes.add((source as Node).id);
                newHighlightNodes.add((target as Node).id);
                newHighlightLinks.add(`${(source as Node).id}-${(target as Node).id}`);
              }
            }
          });
          
          setHighlightNodes(newHighlightNodes);
          setHighlightLinks(newHighlightLinks);
          setSelectedCategory(category);
        }
      } else {
        setHighlightNodes(new Set());
        setHighlightLinks(new Set());
        setSelectedCategory(null);
      }
    };
  
    useEffect(() => {
      try {
        const nodes: Node[] = [];
        const links: Link[] = [];
        const uicMap = new Map<number, boolean>();
  
        // Calculate positions for recruits in a circle
        const totalRecruits = recruits.length;
        const angleStep = (2 * Math.PI) / (totalRecruits - 1); // -1 because "ME" will be in center
        let currentAngle = 0;
        const radius = Math.min(width, height) * 0.25; // Reduced radius to give more space
  
        // Calculate container center - this is where "ME" will be
        const centerX = 0;
        const centerY = 0;
  
        recruits.forEach(recruit => {
          if (!uicMap.has(recruit.uic)) {
            uicMap.set(recruit.uic, true);
            
            const uicX = centerX + (radius * 1.5) * Math.cos(currentAngle);
            const uicY = centerY + (radius * 1.5) * Math.sin(currentAngle);
            
            nodes.push({
              id: `uic-${recruit.uic}`,
              name: `UIC ${recruit.uic}`,
              value: 50,
              color: '#AACDEC',
              outlineColor: '#0076D6',
              label: `UIC ${recruit.uic}`,
              group: 'uic',
              uic: recruit.uic,
              fx: uicX,
              fy: uicY
            });
  
            // Position UIC wellness averages in a semi-circle around the UIC node
            const averages = calculateUICWellnessAverages(recruit.uic);
            const categories = Object.entries(averages);
            const avgRadius = 100; // Radius for average nodes around UIC
            
            categories.forEach(([category, value], index) => {
              // Calculate angle in a semi-circle (π radians) facing away from center
              const baseAngle = Math.atan2(uicY - centerY, uicX - centerX);
              const spreadAngle = Math.PI * 0.8; // Use 0.8π radians (144 degrees) for spread
              const avgAngle = baseAngle - (spreadAngle/2) + (spreadAngle * index/(categories.length - 1));
              
              const nodeId = `uic-${recruit.uic}-avg-${category}`;
              const formattedName = `Avg ${category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
              const colors = getNodeColors(value);
              
              nodes.push({
                id: nodeId,
                name: formattedName,
                value: value,
                color: colors.fill,
                outlineColor: colors.outline,
                label: `${formattedName}: ${value}%`,
                group: 'uic-wellness',
                uic: recruit.uic,
                category: category,
                fx: uicX + avgRadius * Math.cos(avgAngle),
                fy: uicY + avgRadius * Math.sin(avgAngle)
              });
  
              links.push({
                source: `uic-${recruit.uic}`,
                target: nodeId,
                value: value
              });
            });
            
            currentAngle += angleStep;
          }
        });
  
        recruits.forEach((recruit, index) => {
          const recruitNodeId = `recruit-${recruit.id}`;
          const isMe = recruit.id === MY_ID;
          
          // Calculate position for recruit
          let x, y;
          if (isMe) {
            x = centerX;
            y = centerY;
          } else {
            x = centerX + radius * Math.cos(currentAngle);
            y = centerY + radius * Math.sin(currentAngle);
            currentAngle += angleStep;
          }
          
          nodes.push({
            id: recruitNodeId,
            name: isMe ? 'ME' : `Anonymous ${index + 1}`,
            value: isMe ? 60 : 50,
            color: isMe ? '#FFD700' : '#AACDEC',
            outlineColor: isMe ? '#FFA500' : '#0076D6',
            label: isMe ? 'ME' : `Anonymous ${index + 1}`,
            group: 'center',
            recruitId: recruit.id,
            uic: recruit.uic,
            fx: x,
            fy: y
          });
  
          links.push({
            source: recruitNodeId,
            target: `uic-${recruit.uic}`,
            value: 75
          });
  
          // Calculate wellness nodes positions in a circle around the recruit
          const wellnessCategories = Object.entries(recruit.overall_wellness);
          const wellnessRadius = isMe ? 120 : 80;
          
          wellnessCategories.forEach(([category, value], wIndex) => {
            const nodeId = `${recruitNodeId}-${category}`;
            const formattedName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const colors = getNodeColors(value);
            const angle = (2 * Math.PI * wIndex) / wellnessCategories.length;
            
            nodes.push({
              id: nodeId,
              name: formattedName,
              value: value,
              color: colors.fill,
              outlineColor: colors.outline,
              label: `${formattedName}: ${value}%`,
              group: 'wellness',
              recruitId: recruit.id,
              uic: recruit.uic,
              category: category,
              fx: x + wellnessRadius * Math.cos(angle),
              fy: y + wellnessRadius * Math.sin(angle)
            });
  
            links.push({
              source: recruitNodeId,
              target: nodeId,
              value: value
            });
          });
        });
  
        setGraphData({ nodes, links });
        setError(null);
  
      } catch (err) {
        console.error('Error generating graph:', err);
        setError('An error occurred while loading the graph data.');
      }
    }, [width, height]);
  
    const nodeCanvasObject = (node: Node, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const label = node.name;
      const fontSize = 12/globalScale;
      ctx.font = `${fontSize}px Sans-Serif`;
      
      const isMe = node.recruitId === MY_ID;
      const nodeSize = isMe ? 15 : 
                      node.group === 'uic' ? 12 : 
                      node.group === 'uic-wellness' ? 10 : 8;
      
      const isHighlighted = highlightNodes.has(node.id);
      const opacity = highlightNodes.size > 0 ? (isHighlighted ? 1 : 0.2) : 1;
      
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, nodeSize, 0, 2 * Math.PI);
      ctx.fillStyle = node.color || '#000000';
      ctx.globalAlpha = opacity;
      ctx.fill();
      
      ctx.strokeStyle = node.outlineColor || '#000000';
      ctx.lineWidth = isMe ? 3/globalScale : 2/globalScale;
      ctx.stroke();
      
      ctx.globalAlpha = opacity;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#000';
      ctx.fillText(label, node.x!, node.y! - (nodeSize + 4));
      ctx.globalAlpha = 1;
    };
  
    if (error) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Error</h2>
            </div>
            <p className="text-gray-700">{error}</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-lg p-4" style={{ height: height - 150 }}>
            {graphData.nodes.length > 0 && (
              <ForceGraph2D
                graphData={graphData}
                nodeCanvasObject={nodeCanvasObject}
                nodeLabel={node => (node as Node).label}
                nodeColor={node => (node as Node).color || '#000000'}
                nodeRelSize={8}
                linkWidth={link => {
                  const source = typeof link.source === 'object' ? link.source.id : link.source;
                  const target = typeof link.target === 'object' ? link.target.id : link.target;
                  const isHighlighted = highlightLinks.has(`${source}-${target}`);
                  const isMeLink = (typeof link.source === 'object' && (link.source as Node).recruitId === MY_ID) ||
                                  (typeof link.target === 'object' && (link.target as Node).recruitId === MY_ID);
                  return ((link as Link).value / 20) * (highlightLinks.size > 0 ? (isHighlighted ? 1.5 : 0.2) : 1) * (isMeLink ? 1.5 : 1);
                }}
                linkColor={link => {
                  const source = typeof link.source === 'object' ? link.source.id : link.source;
                  const target = typeof link.target === 'object' ? link.target.id : link.target;
                  const isHighlighted = highlightLinks.has(`${source}-${target}`);
                  const isMeLink = (typeof link.source === 'object' && (link.source as Node).recruitId === MY_ID) ||
                                  (typeof link.target === 'object' && (link.target as Node).recruitId === MY_ID);
                  return highlightLinks.size > 0 ? 
                    (isHighlighted ? '#0076D6' : '#ddd') : 
                    (isMeLink ? '#FFA500' : '#999');
                }}
                width={width - 48}
                height={height - 180}
                cooldownTicks={100}
                onNodeClick={handleNodeClick}
                centerAt={[0, 0]}
                zoom={8}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default KnowledgeGraph;