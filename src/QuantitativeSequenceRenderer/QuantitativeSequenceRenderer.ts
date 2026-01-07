import PluginManager from '@jbrowse/core/PluginManager'
import { getOrigin, getColor } from '../util'

export default function rendererFactory(pluginManager: PluginManager) {
  const WigglePlugin = pluginManager.getPlugin(
    'WigglePlugin',
  ) as import('@jbrowse/plugin-wiggle').default
  const {
    utils: { getScale },
    //@ts-ignore
    XYPlotRenderer,
    //@ts-ignore
  } = WigglePlugin.exports

  const { featureSpanPx } = pluginManager.lib['@jbrowse/core/util']

  return class QuantitativeSequenceRenderer extends XYPlotRenderer {
    draw(ctx: CanvasRenderingContext2D, props: any) {
      const {
        features,
        regions,
        bpPerPx,
        scaleOpts,
        height: unadjustedHeight,
        displayCrossHatches,
        ticks: { values },
      } = props
      const [region] = regions
      const YSCALEBAR_LABEL_OFFSET = 5
      const height = unadjustedHeight - YSCALEBAR_LABEL_OFFSET * 2
      const opts = { ...scaleOpts, range: [0, height] }
      const width = (region.end - region.start) / bpPerPx
      const originY = getOrigin(scaleOpts.scaleType)
      const scale = getScale(opts)

      if (region.end - region.start > 5000) {
        console.log('using super')
        super.draw(ctx, props)
        return
      }

      const toY = (n: number) => height - scale(n) + YSCALEBAR_LABEL_OFFSET
      const toHeight = (n: number) => toY(originY) - toY(n)

      console.log({ features })
      
      // Use a fixed base font size for consistent width
      const baseFontSize = 20
      ctx.font = `bold ${baseFontSize}px sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'alphabetic'
      
      for (const feature of features.values()) {
        const [leftPx, rightPx] = featureSpanPx(feature, region, bpPerPx)
        const score = feature.get('score') as number
        const base = feature.get('base')
        const letterHeight = Math.abs(toHeight(score))
        
        // Calculate how much to scale the letter vertically
        // Divide by baseFontSize to get the scale factor
        const heightScale = letterHeight / baseFontSize
        
        // Set color for the letter
        ctx.fillStyle = getColor(base)
        
        // Calculate center position for horizontal alignment
        const centerX = leftPx + (rightPx - leftPx) / 2
        const baselineY = toY(originY)
        
        ctx.save()
        
        // Translate to the baseline at center X
        ctx.translate(centerX, baselineY)
        
        // Scale only the Y direction based on score
        // Canvas Y axis points downward, so:
        // - Positive scores: use positive scale to stretch upward (text draws above baseline)
        // - Negative scores: use negative scale to flip and stretch downward
        if (score >= 0) {
          // Positive: stretch upward (normal direction)
          ctx.scale(1, heightScale)
        } else {
          // Negative: flip and stretch downward
          ctx.scale(1, -heightScale)
        }
        
        // Draw at origin (0, 0) which is now at centerX, baselineY with scaling applied
        ctx.fillText(base, 0, 0)
        
        ctx.restore()
      }

      if (displayCrossHatches) {
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(200,200,200,0.8)'
        values.forEach((tick: number) => {
          ctx.beginPath()
          ctx.moveTo(0, Math.round(toY(tick)))
          ctx.lineTo(width, Math.round(toY(tick)))
          ctx.stroke()
        })
      }
    }
  }
}
