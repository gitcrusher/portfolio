"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3-force';

export default function Skills() {
  const allSkills = [
    { name: "Python", size: 100, category: "intel" },
    { name: "C++", size: 85, category: "intel" },
    { name: "Java", size: 90, category: "intel" },
    { name: "SQL", size: 80, category: "intel" },
    { name: "HTML", size: 75, category: "intel" },
    { name: "CSS", size: 75, category: "intel" },
    { name: "Flutter", size: 95, category: "intel" },
    { name: "PyTorch", size: 110, category: "neural" },
    { name: "TensorFlow", size: 110, category: "neural" },
    { name: "Scikit-learn", size: 105, category: "neural" },
    { name: "OpenCV", size: 100, category: "neural" },
    { name: "NumPy", size: 85, category: "neural" },
    { name: "Seaborn", size: 90, category: "neural" },
    { name: "Matplotlib", size: 95, category: "neural" },
    { name: "JMeter", size: 90, category: "orch" },
    { name: "TestNG", size: 85, category: "orch" },
    { name: "Jira", size: 80, category: "orch" },
    { name: "Leadership", size: 95, category: "soft" },
    { name: "Diligence", size: 90, category: "soft" },
    { name: "Versatility", size: 95, category: "soft" },
    { name: "Agility", size: 85, category: "soft" },
    { name: "Composure", size: 90, category: "soft" },
  ];

  const categories = {
    intel: { text: "#A68A64", bg: "#E5D3B3" },
    neural: { text: "#FAF7F2", bg: "#A68A64" },
    orch: { text: "#4A4A4A", bg: "#FAF7F2" },
    soft: { text: "#FFFFFF", bg: "#4A4A4A" },
  };

  const playgroundRef = useRef(null);
  const simulationRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handlePointerMove = useCallback((e) => {
    if (playgroundRef.current && nodes.length > 0) {
      const rect = playgroundRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      nodes.forEach(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const pushRadius = node.size * 1.5;

        if (distance < pushRadius) {
          const power = (pushRadius - distance) / pushRadius;
          node.vx += (dx / distance) * power * 40;
          node.vy += (dy / distance) * power * 40;
        }
      });
      if (simulationRef.current) simulationRef.current.alphaTarget(0.2).restart();
    }
  }, [nodes]);

  useEffect(() => {
    const updateDimensions = () => {
      if (playgroundRef.current) {
        setDimensions({
          width: playgroundRef.current.offsetWidth,
          height: playgroundRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // --- FIX: VISUAL CENTROID ADJUSTMENT ---
    // Hum center ko thoda upar shift kar rahe hain (-20 or -30) taaki wo frame mein centered lage
    const centerY = dimensions.height / 2 - 10; 

    const initialNodes = allSkills.map((skill) => ({
      ...skill,
      x: dimensions.width / 2 + (Math.random() - 0.5) * 50,
      y: centerY + (Math.random() - 0.5) * 50,
      vx: 0, vy: 0,
    }));

    setNodes(initialNodes);

    const simulation = d3.forceSimulation(initialNodes)
      .velocityDecay(0.28)
      .force('center', d3.forceCenter(dimensions.width / 2, centerY).strength(1)) // Max strength for centroid
      .force('charge', d3.forceManyBody().strength(35))
      .force('collide', d3.forceCollide((d) => d.size / 2 + 10).strength(1))
      .alphaTarget(0.05)
      .on('tick', () => {
        initialNodes.forEach(node => {
          const r = node.size / 2;
          if (node.x < r) node.x = r;
          if (node.x > dimensions.width - r) node.x = dimensions.width - r;
          if (node.y < r) node.y = r;
          if (node.y > dimensions.height - r) node.y = dimensions.height - r;
        });
        setNodes([...initialNodes]);
      });

    simulationRef.current = simulation;
    return () => simulation.stop();
  }, [dimensions]);

  return (
    <section id="skills" className="relative w-full bg-[#FAF7F2] py-12 overflow-hidden border-t border-[#A68A64]/10">
      <div className="w-full px-10 md:px-24">
        
        <div className="mb-8 text-left">
          <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase block mb-2 opacity-80">
            / expertise_matrix
          </span>
          <h2 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic tracking-tighter lowercase leading-none">
            cognitive_cloud_
          </h2>
        </div>

        <div 
          ref={playgroundRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => simulationRef.current?.alphaTarget(0.1)}
          className="relative h-[550px] w-full border border-[#A68A64]/10 rounded-[40px] md:rounded-[60px] bg-white/40 backdrop-blur-sm cursor-crosshair overflow-hidden shadow-[inset_0_0_80px_rgba(230,220,200,0.05)]"
        >
          {nodes.map((skill, i) => (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center rounded-full border border-[#A68A64]/15 text-center cursor-none"
              style={{ 
                width: skill.size, 
                height: skill.size,
                backgroundColor: categories[skill.category].bg,
                color: categories[skill.category].text,
                left: skill.x - skill.size / 2,
                top: skill.y - skill.size / 2,
                boxShadow: "0 8px 25px rgba(166,138,100,0.1)",
                zIndex: skill.size
              }}
              whileHover={{ scale: 1.15 }}
            >
              <span className="font-mono text-[9px] font-black uppercase tracking-tighter px-2 leading-none select-none">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}