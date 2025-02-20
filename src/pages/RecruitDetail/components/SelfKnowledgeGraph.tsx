import { useCallback, useMemo, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Recruit } from '../types';
import './selfknowledgegraph.scss'

interface KnowledgeGraphProps {
  recruit: Recruit;
  selfImg: string;
}

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
  percentage: number
) => {
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (2 * Math.PI * percentage) / 100;
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 6, 0, 2 * Math.PI);
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 8;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 6, startAngle, endAngle);
  ctx.strokeStyle = getNodeColors(percentage).stroke;
  ctx.lineWidth = 8;
  ctx.stroke();
};

const capitalizeWords = (str: string) => {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const SelfKnowledgeGraph = ({ recruit,  selfImg }: KnowledgeGraphProps,) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = selfImg;
    img.onload = () => {
      profileImageRef.current = img;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    container.addEventListener('wheel', preventWheel, { passive: false });
    return () => container.removeEventListener('wheel', preventWheel);
  }, []);

  const { nodes, links } = useMemo(() => {
    const graphData: { nodes: Node[]; links: Link[] } = {
      nodes: [],
      links: []
    };

    const wellnessValues = Object.values(recruit.overall_wellness);
    const averageScore = wellnessValues.reduce((sum, value) => sum + value, 0) / wellnessValues.length;

    const recruitNodeId = `recruit-${recruit.id}`;
    graphData.nodes.push({
      id: recruitNodeId,
      name: `${recruit.first_name} ${recruit.last_name}`.trim(),
      value: 40,
      group: 'recruit',
      averageScore
    });

    Object.entries(recruit.overall_wellness).forEach(([category, value]) => {
      const categoryNodeId = `category-${category}`;
      
      graphData.nodes.push({
        id: categoryNodeId,
        name: capitalizeWords(category.replace(/_/g, ' ')),
        value: 30,
        group: 'category',
        percentage: value
      });

      graphData.links.push({
        source: recruitNodeId,
        target: categoryNodeId,
        value
      });
    });

    return graphData;
  }, [recruit]);

  const nodeCanvasObject = useCallback((node: Node, ctx: CanvasRenderingContext2D) => {
    const label = node.name;
    const fontSize = node.group === 'recruit' ? 16 : 14;
    ctx.font = `${fontSize}px Sans-Serif`;
    
    const radius = node.group === 'recruit' ? 35 : 30;

    if (node.group === 'recruit' && profileImageRef.current) {
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, radius + 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
      ctx.clip();

      const imgSize = radius * 2;
      ctx.drawImage(
        profileImageRef.current,
        node.x! - radius,
        node.y! - radius,
        imgSize,
        imgSize
      );
      ctx.restore();

      if (node.averageScore !== undefined) {
        drawDonutChart(ctx, node.x!, node.y!, radius, node.averageScore);

        const score = Math.round(node.averageScore);
        ctx.font = '14px Sans-Serif';
        const scoreText = `${score}%`;
        const scoreWidth = ctx.measureText(scoreText).width;
        const scorePadding = 8;
        const scoreX = node.x! + radius + 10;
        const scoreY = node.y! - radius;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          scoreX - scorePadding,
          scoreY - 10,
          scoreWidth + scorePadding * 2,
          20
        );

        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(scoreText, scoreX + scoreWidth / 2, scoreY);
      }

      const textWidth = ctx.measureText(label).width;
      const padding = 10;
      const textHeight = fontSize;
      const textY = node.y! + radius + 30;
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(
        node.x! - textWidth / 2 - padding,
        textY - textHeight / 2,
        textWidth + padding * 2,
        textHeight + padding
      );

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#000000';
      ctx.fillText(label, node.x!, textY);
    } else {
      const { fill, stroke } = getNodeColors(node.percentage);
      
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
      ctx.fillStyle = fill;
      ctx.fill();
      
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      if (node.percentage !== undefined) {
        ctx.font = '14px Sans-Serif';
        const scoreText = `${Math.round(node.percentage)}%`;
        const scoreWidth = ctx.measureText(scoreText).width;
        const scorePadding = 8;
        const scoreX = node.x! + radius + 10;
        const scoreY = node.y! - radius / 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          scoreX - scorePadding,
          scoreY - 10,
          scoreWidth + scorePadding * 2,
          20
        );

        ctx.fillStyle = '#374151';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(scoreText, scoreX + scoreWidth / 2, scoreY);
      }

      ctx.shadowColor = 'transparent';
      ctx.font = `${fontSize}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#374151';
      ctx.fillText(label, node.x!, node.y! + radius + 8);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !graphRef.current) return;

    const width = 800;
    const height = 600;
    const padding = 100; // Add padding to ensure nodes don't get cut off

    const recruitNode = nodes.find(node => node.group === 'recruit');
    if (recruitNode) {
      const centerX = width / 2;
      const centerY = height / 2;
      
      recruitNode.x = centerX;
      recruitNode.y = centerY;
      recruitNode.fx = centerX;
      recruitNode.fy = centerY;

      const categoryNodes = nodes.filter(node => node.group === 'category');
      const radius = Math.min(width - padding * 2, height - padding * 2) * 0.45; // Increased from 0.35 to 0.45
      const angleStep = (2 * Math.PI) / categoryNodes.length;

      categoryNodes.forEach((node, index) => {
        const angle = angleStep * index - Math.PI / 2; // Start from top (subtract PI/2)
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        node.x = x;
        node.y = y;
        node.fx = x;
        node.fy = y;
      });

      graphRef.current.d3Force('charge').strength(-250);
      graphRef.current.d3Force('link').distance(radius);
      
      graphRef.current.centerAt(centerX, centerY);
      graphRef.current.zoom(1);
    }
  }, [nodes]);

  return (
    <div 
      ref={containerRef} 
      className="self-knowledge-graph"
    >
      <ForceGraph2D
        ref={graphRef}
        width={800}
        height={600}
        graphData={{ nodes, links }}
        nodeCanvasObject={nodeCanvasObject}
        nodeCanvasObjectMode={() => 'replace'}
        linkColor={() => '#374151'}
        linkWidth={2}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        d3VelocityDecay={0.3}
        cooldownTicks={50}
        enableZoom={false}
        enablePanInteraction={false}
        minZoom={1}
        maxZoom={1}
        onZoom={() => false}
        onEngineStop={() => {
          nodes.forEach(node => {
            if (node.fx === undefined) {
              node.fx = node.x;
              node.fy = node.y;
            }
          });
        }}
      />
    </div>
  );
};

export default SelfKnowledgeGraph;