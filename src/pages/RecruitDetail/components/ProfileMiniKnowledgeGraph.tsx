import { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import './profileminiknowledgegraph.scss';

interface Node {
  id: string;
  name: string;
  value: number;
  group: string;
  fx?: number | null;
  fy?: number | null;
  percentage?: number;
  averageScore?: number;
  x?: number;
  y?: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface KnowledgeGraphProps {
  recruits: Recruit | Recruit[];
  profileImg: string;
}

const getNodeColors = (percentage: number | undefined): { fill: string; stroke: string } => {
  if (percentage === undefined) return { fill: '#f0f0f0', stroke: '#e5e7eb' };
  if (percentage >= 80) return { fill: '#B7F5BD', stroke: '#21C834' };
  if (percentage >= 70) return { fill: '#FFCFA1', stroke: '#DD8C3F' };
  return { fill: '#F5A9AA', stroke: '#CC4142' };
};

const drawDonutChart = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  percentage: number,
  scale: number
) => {
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (2 * Math.PI * percentage) / 100;
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + (6 * scale), 0, 2 * Math.PI);
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 8 * scale;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + (6 * scale), startAngle, endAngle);
  ctx.strokeStyle = getNodeColors(percentage).stroke;
  ctx.lineWidth = 8 * scale;
  ctx.stroke();
};

const capitalizeWords = (str: string) => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const ProfileMiniKnowledgeGraph = ({ recruits, profileImg }: KnowledgeGraphProps) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = profileImg;
    img.onload = () => {
      profileImageRef.current = img;
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: width * 0.85,
          height: Math.min(height, 700) * 0.85
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [isMounted]);

  const { nodes, links } = useMemo(() => {
    const graphData: { nodes: Node[]; links: Link[] } = {
      nodes: [],
      links: []
    };

    const recruitsArray = Array.isArray(recruits) ? recruits : [recruits];

    recruitsArray.forEach(recruit => {
      const wellnessValues = Object.values(recruit.overall_wellness);
      const averageScore = wellnessValues.reduce((sum, value) => sum + value, 0) / wellnessValues.length;

      const recruitNodeId = `recruit-${recruit.id}`;
      graphData.nodes.push({
        id: recruitNodeId,
        name: `${recruit.first_name} ${recruit.last_name}`.trim(),
        value: 25,
        group: 'recruit',
        averageScore
      });

      Object.entries(recruit.overall_wellness).forEach(([category, value]) => {
        const categoryNodeId = `category-${category}`;
        
        if (!graphData.nodes.find(n => n.id === categoryNodeId)) {
          graphData.nodes.push({
            id: categoryNodeId,
            name: capitalizeWords(category),
            value: 15,
            group: 'category',
            percentage: value
          });
        }

        graphData.links.push({
          source: recruitNodeId,
          target: categoryNodeId,
          value
        });
      });
    });

    return graphData;
  }, [recruits]);

  const getScaleFactor = useCallback((width: number, height: number) => {
    const baseSize = 400;
    const scale = Math.min(width, height) / baseSize;
    return Math.max(0.5, Math.min(2, scale));
  }, []);

  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
    const scale = getScaleFactor(dimensions.width, dimensions.height);
    const label = node.name;
    const fontSize = Math.round((node.group === 'recruit' ? 12 : 10) * scale);
    ctx.font = `${fontSize}px Sans-Serif`;
    
    const baseRadius = node.group === 'recruit' ? 17 : 15;
    const radius = baseRadius * scale;

    if (node.group === 'recruit' && profileImageRef.current) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + (4 * scale), 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.clip();

      const imgSize = radius * 2;
      ctx.drawImage(
        profileImageRef.current,
        node.x - radius,
        node.y - radius,
        imgSize,
        imgSize
      );
      ctx.restore();

      if (node.averageScore !== undefined) {
        drawDonutChart(ctx, node.x, node.y, radius, node.averageScore, scale);

        const score = Math.round(node.averageScore);
        ctx.font = `${Math.round(10 * scale)}px Sans-Serif`;
        const scoreText = `${score}%`;
        const scoreWidth = ctx.measureText(scoreText).width;
        const scorePadding = 4 * scale;
        const scoreX = node.x + radius - scoreWidth / 2;
        const scoreY = node.y - radius - (5 * scale);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          scoreX - scorePadding,
          scoreY - (7 * scale),
          scoreWidth + (scorePadding * 2),
          14 * scale
        );

        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(scoreText, scoreX + scoreWidth / 2, scoreY);
      }

      const textWidth = ctx.measureText(label).width;
      const padding = 6 * scale;
      const textHeight = fontSize;
      const textY = node.y + radius + (19 * scale);
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(
        node.x - textWidth / 2 - padding,
        textY - textHeight / 2,
        textWidth + padding * 2,
        textHeight + padding
      );

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000';
      ctx.fillText(label, node.x, textY);
    } else {
      const { fill, stroke } = getNodeColors(node.percentage);
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = fill;
      ctx.fill();
      
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2 * scale;
      ctx.stroke();

      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 2 * scale;
      ctx.shadowOffsetX = 1 * scale;
      ctx.shadowOffsetY = 1 * scale;

      ctx.shadowColor = 'transparent';
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#374151';
      ctx.fillText(label, node.x, node.y + radius + (4 * scale));
    }
  }, [dimensions, getScaleFactor]);

  useEffect(() => {
    if (!containerRef.current || !graphRef.current || !dimensions.width || !dimensions.height) return;

    const { width, height } = dimensions;
    const scale = getScaleFactor(width, height);

    const recruitNode = nodes.find(node => node.group === 'recruit');
    if (recruitNode) {
      const centerX = width / 2;
      const centerY = height / 2 + (35 * scale);
      
      recruitNode.x = centerX;
      recruitNode.y = centerY;
      recruitNode.fx = centerX;
      recruitNode.fy = centerY;

      const categoryNodes = nodes.filter(node => node.group === 'category');
      const radius = Math.min(width, height) * 0.35;
      const angleStep = (2 * Math.PI) / categoryNodes.length;
      const startAngle = -Math.PI / 2; // Start from top

      categoryNodes.forEach((node, index) => {
        const angle = startAngle + (angleStep * index);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        node.x = x;
        node.y = y;
        node.fx = x;
        node.fy = y;
      });

      graphRef.current.d3Force('charge').strength(-150 * scale);
      graphRef.current.d3Force('link').distance(radius);
      
      graphRef.current.centerAt(centerX, centerY);
      graphRef.current.zoom(1);
    }
  }, [nodes, dimensions, getScaleFactor]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full full-height flex items-center justify-center"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
          ref={graphRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={{ nodes, links }}
          nodeCanvasObject={nodeCanvasObject}
          nodeCanvasObjectMode={() => 'replace'}
          linkColor={() => '#374151'}
          linkWidth={dimensions.width / 400}
          linkDirectionalParticles={0} // No particles for links
          linkDirectionalParticleWidth={0}
          d3VelocityDecay={0.3}
          cooldownTicks={50}
          enableZoom={false} // Disable zoom
          enablePanInteraction={false} // Disable pan interaction
          minZoom={1} // Disable zooming out
          maxZoom={1} // Disable zooming in
          onZoom={() => false} 
          onEngineStop={() => {
            nodes.forEach(node => {
              if (node.fx === undefined) {
                node.fx = node.x;
                node.fy = node.y;
              }
            });
          }}
          nodeAutoColorBy={null} // Disable tooltip or hover behavior
          onNodeHover={() => {}} // Disable tooltip interaction
        />
      )}
    </div>
  );
};

export default ProfileMiniKnowledgeGraph;
