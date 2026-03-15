"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3-force';

export default function Skills() {
  const allSkills = [
    // Languages & Core
    { name: "Python", size: 110, category: "intel" },
    { name: "C++", size: 90, category: "intel" },
    { name: "Java", size: 95, category: "intel" },
    { name: "SQL", size: 85, category: "intel" },
    { name: "HTML", size: 80, category: "intel" },
    { name: "CSS", size: 80, category: "intel" },
    { name: "Flutter", size: 100, category: "intel" },

    // ML & Data Science
    { name: "PyTorch", size: 120, category: "neural" },
    { name: "TensorFlow", size: 115, category: "neural" },
    { name: "Scikit-learn", size: 110, category: "neural" },
    { name: "OpenCV", size: 105, category: "neural" },
    { name: "NumPy", size: 90, category: "neural" },
    { name: "Seaborn", size: 95, category: "neural" },
    { name: "Matplotlib", size: 100, category: "neural" },

    // Tools & Testing
    { name: "JMeter", size: 95, category: "orch" },
    { name: "TestNG", size: 90, category: "orch" },
    { name: "Jira", size: 85, category: "orch" },

    // Soft Skills
    { name: "Leadership", size: 100, category: "soft" },
    { name: "Diligence", size: 95, category: "soft" },
    { name: "Versatility", size: 100, category: "soft" },
    { name: "Agility", size: 90, category: "soft" },
    { name: "Composure", size: 95, category: "soft" },
  ];

  const categories = {
    intel: { text: "#A68A64", bg: "#E5D3B3" }, // Dusty Gold (Languages)
    neural: { text: "#FAF7F2", bg: "#A68A64" }, // Charcoal (AI/ML)
    orch: { text: "#4A4A4A", bg: "#FAF7F2" }, // Alabaster (Tools)
    soft: { text: "#FFFFFF", bg: "#4A4A4A" }, // Dark (Soft Skills)
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
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const initialNodes = allSkills.map((skill) => ({
      ...skill,
      x: dimensions.width / 2 + (Math.random() - 0.5) * 100,
      y: dimensions.height / 2 + (Math.random() - 0.5) * 100,
      vx: 0,
      vy: 0,
    }));

    setNodes(initialNodes);

    const simulation = d3.forceSimulation(initialNodes)
      .velocityDecay(0.25)
      .force('center', d3.forceCenter(dimensions.width / 2, dimensions.height / 2).strength(0.8))
      .force('charge', d3.forceManyBody().strength(40))
      .force('collide', d3.forceCollide((d) => d.size / 2 + 10).strength(1))
      .alphaTarget(0.1)
      .on('tick', () => {
        // Hard Boundary Clamping for all skills
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
    <section id="skills" className="relative w-full bg-[#FAF7F2] py-32 px-10 md:px-24 z-[60] overflow-hidden shadow-[0_-50px_100px_rgba(250,247,242,1)]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-[#A68A64] font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">/ Expertise_Matrix</span>
          <h2 className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic tracking-tighter lowercase leading-none">cognitive_cloud_</h2>
        </motion.div>

        <div 
          ref={playgroundRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => simulationRef.current?.alphaTarget(0.1)}
          className="relative h-[700px] w-full border border-[#A68A64]/10 rounded-[60px] bg-white/40 backdrop-blur-sm cursor-crosshair overflow-hidden shadow-[inset_0_0_80px_rgba(230,220,200,0.2)]"
        >
          {nodes.map((skill, i) => (
            <motion.div
              key={i}
              drag
              dragConstraints={playgroundRef}
              dragElastic={0.1}
              whileHover={{ scale: 1.1, zIndex: 100 }}
              className="absolute flex items-center justify-center rounded-full border border-[#A68A64]/20 p-4 active:cursor-grabbing text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow"
              style={{ 
                width: skill.size, 
                height: skill.size,
                backgroundColor: categories[skill.category].bg,
                color: categories[skill.category].text,
                left: `${skill.x - skill.size / 2}px`,
                top: `${skill.y - skill.size / 2}px`,
                transform: `rotate(${skill.vx * 2}deg)`
              }}
            >
              <div className="font-mono text-[10px] font-bold tracking-tight uppercase leading-tight select-none">
                {skill.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}