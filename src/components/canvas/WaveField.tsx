'use client'

import { useWaveField, type WaveFieldConfig } from './useWaveField'

export function WaveField({
  className,
  config,
}: {
  className?: string
  config?: WaveFieldConfig
}) {
  const ref = useWaveField(config)
  return <canvas ref={ref} className={className} />
}

