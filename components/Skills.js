"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const headingText = "cognitive_cloud_";

  useEffect(() => {
    const updateDimensions = () => {
      if (playgroundRef.current) {
        const { offsetWidth, offsetHeight } = playgroundRef.current;
        if (offsetWidth > 0 && offsetHeight > 0) {
          setDimensions({ width: offsetWidth, height: offsetHeight });
        }
      }
    };
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (playgroundRef.current && nodes.length > 0) {
      const rect = playgroundRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      nodes.forEach(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          const power = (150 - distance) / 150;
          node.vx += (dx / distance) * power * 35;
          node.vy += (dy / distance) * power * 35;
        }
      });
      simulationRef.current?.alphaTarget(0.2).restart();
    }
  }, [nodes]);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    const centerY = dimensions.height / 2;
    const initialNodes = allSkills.map((skill) => ({
      ...skill,
      x: dimensions.width / 2 + (Math.random() - 0.5) * 100,
      y: centerY + (Math.random() - 0.5) * 100,
      vx: 0, vy: 0,
    }));
    setNodes(initialNodes);
    const simulation = d3.forceSimulation(initialNodes)
      .velocityDecay(0.3)
      .force('center', d3.forceCenter(dimensions.width / 2, centerY).strength(1))
      .force('charge', d3.forceManyBody().strength(30))
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
    <section id="skills" className="relative w-full bg-[#FAF7F2] py-20 overflow-visible min-h-[800px]">
      <div className="w-full px-10 md:px-24">
        
        {/* High-Fi Header with Repeat Animation */}
        <div className="mb-12 text-left flex flex-wrap">
          {headingText.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              // --- CRITICAL FIX: once: false taaki baar baar chale ---
              viewport={{ once: false, amount: 0.5 }} 
              transition={{ 
                duration: 0.6, 
                delay: index * 0.04,
                ease: "easeOut" 
              }}
              className="text-[#4A4A4A] text-5xl md:text-7xl font-serif italic tracking-tighter inline-block origin-bottom"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        <div 
          ref={playgroundRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => simulationRef.current?.alphaTarget(0.1)}
          className="relative h-[600px] w-full border border-[#A68A64]/10 rounded-[60px] bg-white/40 backdrop-blur-sm overflow-hidden shadow-[inset_0_0_80px_rgba(230,220,200,0.05)]"
        >
          {nodes.length > 0 && nodes.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }} // Bubbles bhi baar baar scale honge
              className="absolute flex items-center justify-center rounded-full border border-[#A68A64]/15 text-center"
              style={{ 
                width: skill.size, 
                height: skill.size,
                backgroundColor: categories[skill.category].bg,
                color: categories[skill.category].text,
                left: skill.x - skill.size / 2,
                top: skill.y - skill.size / 2,
                zIndex: skill.size
              }}
              whileHover={{ scale: 1.1 }}
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