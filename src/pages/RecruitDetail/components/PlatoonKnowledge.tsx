import { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { SidePanelProgress } from './PlatoonKnowledgeSidePanelProgressBar';
import './platoonknowledge.scss';
import profileIconsrc from '../../../assets/person.png';
import { Icon } from '@trussworks/react-uswds'

interface PlatoonKnowledgeGraphProps {
  data: JSON;
  uic: number;
  PlatoonData: JSON;
  profileImg: string;
  recruitID: string;
}

interface Node {
  id: string;
  name: string;
  value: number;
  group: string;
  fx?: number | null;
  fy?: number | null;
  percentage?: number;
  x?: number;
  y?: number;
  recruitId?: string;
  opacity?: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
  group?: string;
}

interface CategoryDetails {
  name: string;
  percentage: number;
  marcusScore: number;
  allRecruits: { name: string; score: number }[];
}

const getNodeColors = (percentage: number | undefined): { fill: string; stroke: string } => {
  if (percentage === undefined) return { fill: '#f0f0f0', stroke: '#e5e7eb' };
  if (percentage >= 80) return { fill: '#B7F5BD', stroke: '#21C834' };
  if (percentage >= 70) return { fill: '#FFCFA1', stroke: '#DD8C3F' };
  return { fill: '#F5A9AA', stroke: '#CC4142' };
};

const capitalizeWords = (str: string) => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const drawDonutChart = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  percentage: number,
  opacity: number = 1
) => {
  if (!ctx) return;

  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (2 * Math.PI * percentage) / 100;
  const { stroke } = getNodeColors(percentage);

  ctx.save();
  ctx.globalAlpha = opacity;

  // Draw background circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#e5e7eb';
  ctx.lineWidth = 12;
  ctx.stroke();

  // Draw percentage arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 12;
  ctx.stroke();

  ctx.restore();
};

const PlatoonKnowledgeGraph = ({ data, uic, profileImg, recruitID }: PlatoonKnowledgeGraphProps) => {
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const profileIconRef = useRef<HTMLImageElement | null>(null);  
  const [selectedCategory, setSelectedCategory] = useState<CategoryDetails | null>(null);

  // Load profile image and profile icon
  useEffect(() => {
    const img = new Image();
    img.src = profileImg;
    img.onload = () => {
      profileImageRef.current = img;
    };

    const profileIcon = new Image();
    profileIcon.src = profileIconsrc; 
    profileIcon.onload = () => {
      profileIconRef.current = profileIcon;
    };
  }, [profileImg]);

  const { nodes, links } = useMemo(() => {
    const graphData: { nodes: Node[]; links: Link[] } = {
      nodes: [],
      links: []
    };

    const uicNodeId = `uic-${uic}`;
    const recruitsInUIC = data.filter((recruit: any) => recruit.uic === uic);

    if (recruitsInUIC.length === 0) {
      graphData.nodes.push({
        id: uicNodeId,
        name: `Platoon ${uic}`,
        value: 40,
        group: 'uic'
      });
      return graphData;
    }

    // Calculate overall wellness average for all recruits in UIC
    const overallAverage = Math.round(
      recruitsInUIC.reduce((sum: any, recruit: any) => {
        const recruitAverage =
          Object.values(recruit.overall_wellness).reduce((a: any, b: any) => a + b, 0) /
          Object.keys(recruit.overall_wellness).length;
        return sum + recruitAverage;
      }, 0) / recruitsInUIC.length
    );

    // Add UIC node at center
    graphData.nodes.push({
      id: uicNodeId,
      name: `Platoon ${uic}`,
      value: 40,
      group: 'uic',
      percentage: overallAverage
    });

    // Add recruits
    recruitsInUIC.forEach((recruit: any) => {
      const recruitAverage =
        Math.round(
          Object.values(recruit.overall_wellness).reduce((a: any, b: any) => a + b, 0) /
          Object.keys(recruit.overall_wellness).length
        );

      const isMarcusSmith = recruit.id === recruitID;

      graphData.nodes.push({
        id: `recruit-${recruit.id}`,
        name: isMarcusSmith ? `${recruit.first_name}` : 'Recruit',
        value: 25,
        group: 'recruit',
        percentage: recruitAverage,
        opacity: isMarcusSmith ? 1 : 0.5
      });

      graphData.links.push({
        source: uicNodeId,
        target: `recruit-${recruit.id}`,
        value: recruitAverage,
        group: 'recruit'
      });

      // Add wellness nodes for recruit 10001
      if (recruit.id === recruitID) {
        Object.entries(recruit.overall_wellness).forEach(([category, value]) => {
          const wellnessNodeId = `wellness-${recruit.id}-${category}`;
          graphData.nodes.push({
            id: wellnessNodeId,
            name: capitalizeWords(category),
            value: 20,
            group: 'wellness',
            percentage: value,
            recruitId: recruit.id
          });

          graphData.links.push({
            source: `recruit-${recruit.id}`,
            target: wellnessNodeId,
            value: value,
            group: 'wellness'
          });
        });
      }
    });

    // Calculate averages for each wellness category
    const wellnessCategories = Object.keys(recruitsInUIC[0].overall_wellness);
    wellnessCategories.forEach((category) => {
      const average =
        Math.round(
          recruitsInUIC.reduce((sum: any, recruit: any) => sum + recruit.overall_wellness[category], 0) /
          recruitsInUIC.length
        );

      const categoryNodeId = `category-${category}`;
      graphData.nodes.push({
        id: categoryNodeId,
        name: capitalizeWords(category),
        value: 30,
        group: 'category',
        percentage: average
      });

      graphData.links.push({
        source: uicNodeId,
        target: categoryNodeId,
        value: average,
        group: 'category'
      });
    });

    return graphData;
  }, [data, uic]);

  // Node click handler
  const handleNodeClick = useCallback(
    (node: Node) => {
      // This console.log helps confirm we actually detect the click:
      console.log('Node clicked:', node);

      if (node.group === 'uic') {
        console.log(`UIC node clicked: ${node.name}`, node);
        // e.g., open a sidebar or do something else
      } 
      else if (node.group === 'category') {
        const categoryName = node.name;
        const categoryKey = categoryName.toLowerCase().replace(/ /g, '_');
        const marcusSmith = data.find((r: any) => r.id === recruitID);

        if (marcusSmith) {
          const details: CategoryDetails = {
            name: categoryName,
            percentage: node.percentage || 0,
            marcusScore: marcusSmith.overall_wellness[categoryKey],
            allRecruits: data.map((recruit: any) => ({
              name:
                recruit.id === recruitID
                  ? `${recruit.first_name} ${recruit.last_name}`
                  : 'Recruit',
              score: recruit.overall_wellness[categoryKey]
            }))
          };
          setSelectedCategory(details);
        }
      }
      // Add additional if/else blocks for 'recruit' or 'wellness' if desired.
    },
    [data, setSelectedCategory]
  );

  // Node rendering
  const nodeCanvasObject = useCallback(
    (node: Node, ctx: CanvasRenderingContext2D) => {
      if (!ctx) return;

      const label = node.name;
      const fontSize = node.group === 'uic' ? 16 : 14;
      ctx.font = `${fontSize}px Sans-Serif`;

      const radius =
        node.group === 'uic'
          ? 45
          : node.group === 'recruit'
          ? 25
          : node.group === 'wellness'
          ? 20
          : 35;
      const opacity = node.opacity ?? 1;

      if (node.group === 'uic') {
        // Draw background circle
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw donut chart
        if (node.percentage !== undefined) {
          drawDonutChart(ctx, node.x!, node.y!, radius - 6, node.percentage);

          // Draw percentage in the center
          ctx.font = 'bold 20px Sans-Serif';
          const scoreText = `${node.percentage}%`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#374151';
          ctx.fillText(scoreText, node.x!, node.y!);
        }

        // Draw label
        const textWidth = ctx.measureText(label).width;
        const padding = 0;
        const textHeight = fontSize;
        const textY = node.y! + radius + 25;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          node.x! - textWidth / 2 - padding,
          textY - textHeight / 2,
          textWidth + padding * 2,
          textHeight + padding
        );

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000';
        ctx.fillText(label, node.x!, textY);
      } 
      else if (node.group === 'recruit') {
        ctx.save();
        ctx.globalAlpha = opacity;

        // Draw background circle
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw profile image or user icon
        if (node.id === `recruit-${recruitID}` && profileImageRef.current) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, radius - 2, 0, Math.PI * 2);
          ctx.clip();
          const imgSize = (radius - 2) * 2;
          ctx.drawImage(
            profileImageRef.current,
            node.x! - radius + 2,
            node.y! - radius + 2,
            imgSize,
            imgSize
          );
          ctx.restore();
        } else if (profileIconRef.current) {
          // Draw the profile icon
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, radius - 2, 0, Math.PI * 2);
          ctx.clip();
          const imgSize = (radius - 2) * 2;
          ctx.drawImage(
            profileIconRef.current,
            node.x! - radius + 2,
            node.y! - radius + 2,
            imgSize,
            imgSize
          );
          ctx.restore();
        }

        // Draw donut chart
        if (node.percentage !== undefined) {
          drawDonutChart(ctx, node.x!, node.y!, radius - 4, node.percentage, opacity);

          // Draw percentage in top right
          ctx.font = 'bold 14px Sans-Serif';
          const scoreText = `${node.percentage}%`;
          const scoreWidth = ctx.measureText(scoreText).width;
          const scorePadding = 6;
          const scoreX = node.x! + radius + 5;
          const scoreY = node.y! - radius;

          // Draw score background
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          (ctx as any).roundRect(
            scoreX - scorePadding,
            scoreY - 10,
            scoreWidth + scorePadding * 2,
            20,
            4
          );
          ctx.fill();
          ctx.strokeStyle = getNodeColors(node.percentage).stroke;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw score text
          ctx.fillStyle = '#374151';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(scoreText, scoreX + scoreWidth / 2, scoreY);
        }

        // Draw label
        const textWidth = ctx.measureText(label).width;
        const padding = 8;
        const textHeight = fontSize;
        const textY = node.y! + radius + 15;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(
          node.x! - textWidth / 2 - padding,
          textY - textHeight / 2,
          textWidth + padding * 2,
          textHeight + padding
        );

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000';
        ctx.fillText(label, node.x!, textY);

        ctx.restore();
      } 
      else {
        // Category or Wellness node
        const { fill, stroke } = getNodeColors(node.percentage);

        ctx.beginPath();
        ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fill;
        ctx.fill();

        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (node.percentage !== undefined) {
          ctx.font = '16px Sans-Serif';
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

        ctx.font = `${fontSize}px PublicSans`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#374151';
        ctx.fillText(label, node.x!, node.y! + radius + 8);
      }
    },
    [data, uic]
  );

  // Position nodes manually (center, category ring, recruit ring, etc.)
  useEffect(() => {
    if (!containerRef.current || !graphRef.current) return;

    const width = 800;
    const height = 600;
    const padding = 30;

    const uicNode = nodes.find((node) => node.group === 'uic');
    if (uicNode) {
      const centerX = width / 2;
      const centerY = height / 2;

      uicNode.x = centerX;
      uicNode.y = centerY;
      uicNode.fx = centerX;
      uicNode.fy = centerY;

      // Position category nodes in inner circle
      const categoryNodes = nodes.filter((node) => node.group === 'category');
      const categoryRadius = Math.min(width - padding * 2, height - padding * 2) * 0.55;
      const categoryAngleStep = (2 * Math.PI) / categoryNodes.length;

      categoryNodes.forEach((node, index) => {
        const angle = categoryAngleStep * index - Math.PI / 2;
        const randomRadius = categoryRadius * (1 + (Math.random() * 0.2 - 0.1));
        const x = centerX + randomRadius * Math.cos(angle);
        const y = centerY + randomRadius * Math.sin(angle);
        node.x = x;
        node.y = y;
        node.fx = x;
        node.fy = y;
      });

      // Position recruit nodes on the outer ring
      const recruitNodes = nodes.filter((node) => node.group === 'recruit');
      const minRadius = Math.min(width - padding * 2, height - padding * 2) * 0.7;
      const maxRadius = Math.min(width - padding * 2, height - padding * 2) * 1.3;
      const recruitAngleStep = (2 * Math.PI) / recruitNodes.length;
      const angleOffset = Math.random() * Math.PI;

      recruitNodes.forEach((node, index) => {
        const angle = recruitAngleStep * index - Math.PI / 2 + angleOffset;
        const radius = minRadius + (Math.random() * 0.7 + 0.3) * (maxRadius - minRadius);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        node.x = x;
        node.y = y;
        node.fx = x;
        node.fy = y;

        // Position wellness nodes for recruit 10001
        if (node.id === `recruit-${recruitID}`) {
          const wellnessNodes = nodes.filter((n) => n.group === 'wellness' && n.recruitId === recruitID);
          const wellnessAngleStep = (2 * Math.PI) / wellnessNodes.length;
          const wellnessRadius = 150;

          wellnessNodes.forEach((wellnessNode, wellnessIndex) => {
            const wellnessAngle = wellnessAngleStep * wellnessIndex;
            const randomOffset = (Math.random() * 20) - 10;
            const adjustedRadius = wellnessRadius + randomOffset;
            wellnessNode.x = x + adjustedRadius * Math.cos(wellnessAngle);
            wellnessNode.y = y + adjustedRadius * Math.sin(wellnessAngle);
            wellnessNode.fx = wellnessNode.x;
            wellnessNode.fy = wellnessNode.y;
          });
        }
      });

      // Adjust force properties
      graphRef.current.d3Force('charge').strength(-800);
      graphRef.current.d3Force('link').distance((d) => {
        if (d.source.group === 'uic' && d.target.group === 'recruit') {
          return minRadius * 1.4 + Math.random() * (maxRadius - minRadius);
        }
        if (d.group === 'wellness') {
          return 120;
        }
        return categoryRadius * (1.2 + Math.random() * 0.2);
      });

      // Center/zoom the graph
      graphRef.current.centerAt(centerX, centerY);
      graphRef.current.zoom(0.7);
    }
  }, [nodes]);

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className="rounded-lg shadow-lg overflow-hidden"
      >
        <ForceGraph2D
          ref={graphRef}
          width={1600}
          height={500}
          graphData={{ nodes, links }}
          nodeCanvasObject={nodeCanvasObject}
          // Our custom drawing replaces the default
          nodeCanvasObjectMode={() => 'replace'}

          // Paint an invisible area to match the circle, so the entire node is clickable
          nodePointerAreaPaint={(node, color, ctx) => {
            const radius =
              node.group === 'uic'
                ? 45
                : node.group === 'recruit'
                ? 25
                : node.group === 'wellness'
                ? 20
                : 80;

            ctx.fillStyle = color; // library uses this color to detect pointer hits
            ctx.beginPath();
            ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI, false);
            ctx.fill();
          }}

          linkColor={(link: Link) => {
            if (link.group === 'wellness') return '#4B5563';
            return link.group === 'category' ? '#666666' : '#C2C2C2';
          }}
          linkWidth={2}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          d3VelocityDecay={0.3}
          cooldownTicks={50}
          enableZoom={true}
          enablePanInteraction={true}
          minZoom={0.4}
          maxZoom={2}
          onNodeClick={handleNodeClick}
          onEngineStop={() => {
            nodes.forEach((node) => {
              if (node.fx === undefined) {
                node.fx = node.x;
                node.fy = node.y;
              }
            });
          }}
        />
      </div>

      {/* Sliding Details Panel */}
      <div 
        className={`absolute sliding-panel ${
          selectedCategory ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedCategory && (
            <><button 
            onClick={() => setSelectedCategory(null)}
            className="close-left-chevron"
          >
            <Icon.NavigateNext size={4}  />
          </button>
          <div className="sliding-panel-content">
              <div className="sliding-panel-title">{selectedCategory.name}</div>
            <div className="progress-content">
                <div className="title">Marcus's {selectedCategory.name} Score</div>
                <SidePanelProgress label='' value={selectedCategory.marcusScore}/>
                
                <div className="progress-value">
                    {selectedCategory.marcusScore}%
                </div>
              {/* UIC Score */}
              <div className="progress-content">
                <div className="title">Platoon {selectedCategory.name} Score</div>
                <SidePanelProgress label='' value={selectedCategory.percentage}/>
                <div className="progress-value">{selectedCategory.percentage}%</div>
              </div>

            <div className="line-break"></div>
              {/* All Recruits */}

              <div>
                <div className="title">All Recruits</div>
                <div className="all-recruits-container">
                  {selectedCategory.allRecruits.map((recruit, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center recruits"
                    >
                      <span className="font-medium text-gray-700">{recruit.name}</span>
                      <span className="font-bold text-gray-900">{recruit.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div></>
        )}
      </div>
    </div>
  );
};

export default PlatoonKnowledgeGraph;
