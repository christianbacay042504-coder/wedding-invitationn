export function getParallaxProgress(
  rectTop: number,
  rectHeight: number,
  viewportHeight: number,
): number {
  const safeViewportHeight = Math.max(viewportHeight, 1);
  const denominator = safeViewportHeight + Math.max(rectHeight, 0) * 0.5;
  const rawProgress = (safeViewportHeight * 0.5 - (rectTop + rectHeight * 0.5)) / denominator;

  return Math.max(-1, Math.min(1, rawProgress));
}

export function getParallaxOffsets(progress: number) {
  return {
    backgroundY: progress * 36,
    farY: progress * -16,
    nearY: progress * -28,
  };
}
