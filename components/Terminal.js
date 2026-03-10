"use client";
export default function Terminal({ title, logs }) {
  return (
    <div className="bg-[#1e293b]/80 backdrop-blur-md border border-slate-700 p-4 rounded-lg font-mono text-sm shadow-2xl">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/50" />
        <span className="text-slate-500 ml-2 text-xs uppercase">{title}</span>
      </div>
      <div className="space-y-1 text-slate-300">
        {logs.map((log, i) => (
          <p key={i}><span className="text-cyan-500 mr-2">$</span>{log}</p>
        ))}
      </div>
    </div>
  );
}