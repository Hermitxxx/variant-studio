'use client';

import React, { useEffect, useState } from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export interface ShadeGradientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  type?: 'sphere' | 'plane' | 'waterPlane';
  uSpeed?: number;
  uStrength?: number;
  uDensity?: number;
  uFrequency?: number;
  uAmplitude?: number;
  brightness?: number;
  className?: string;
  overlayOpacity?: string;
  animate?: 'on' | 'off';
}

export function ShadeGradient({
  color1 = '#ff2056',
  color2 = '#8b5cf6',
  color3 = '#00f0ff',
  type = 'sphere',
  uSpeed = 0.28,
  uStrength = 0.4,
  uDensity = 0.8,
  uFrequency = 5.5,
  uAmplitude = 3.2,
  brightness = 0.95,
  className = '',
  overlayOpacity = 'bg-black/35',
  animate = 'on',
}: ShadeGradientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`pointer-events-none absolute inset-0 z-0 bg-[#050505] ${className}`} />;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      <ShaderGradientCanvas
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        lazyLoad={false}
        fov={45}
        pixelDensity={1}
        pointerEvents="none"
      >
        <ShaderGradient
          animate={animate}
          type={type}
          wireframe={false}
          shader="defaults"
          uTime={0}
          uSpeed={uSpeed}
          uStrength={uStrength}
          uDensity={uDensity}
          uFrequency={uFrequency}
          uAmplitude={uAmplitude}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          color1={color1}
          color2={color2}
          color3={color3}
          reflection={0.4}
          cAzimuthAngle={270}
          cPolarAngle={180}
          cDistance={0.5}
          cameraZoom={15.1}
          lightType="env"
          brightness={brightness}
          envPreset="city"
          grain="off"
          toggleAxis={false}
          zoomOut={false}
          hoverState=""
          enableTransition={false}
        />
      </ShaderGradientCanvas>

      {/* Subtle luxury dark overlay for text contrast and depth */}
      <div className={`pointer-events-none absolute inset-0 ${overlayOpacity}`} />
    </div>
  );
}

export default ShadeGradient;
