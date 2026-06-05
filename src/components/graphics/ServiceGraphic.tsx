'use client'

import dynamic from 'next/dynamic'

const GRAPHICS = {
    'platform-architecture': dynamic(
        () => import('@/components/graphics/ArchFlowGraphic'),
        { ssr: false }
    ),
    'backend-development': dynamic(
        () => import('@/components/graphics/RequestFlowGraphic'),
        { ssr: false }
    ),
    'cloud-infrastructure': dynamic(
        () => import('@/components/graphics/ClusterGraphic'),
        { ssr: false }
    ),
    'system-optimization': dynamic(
        () => import('@/components/graphics/PerfChartGraphic'),
        { ssr: false }
    ),
}

export default function ServiceGraphic({ slug }: { slug: string }) {
    const Graphic = GRAPHICS[slug as keyof typeof GRAPHICS]
    if (!Graphic) return null
    return <Graphic />
}
