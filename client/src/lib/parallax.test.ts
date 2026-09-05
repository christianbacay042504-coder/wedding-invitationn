import { describe, expect, it } from "vitest";
import { getParallaxOffsets, getParallaxProgress } from "./parallax";

describe("scroll parallax math", () => {
  it("clamps section progress to the supported depth range", () => {
    expect(getParallaxProgress(-2400, 800, 800)).toBe(1);
    expect(getParallaxProgress(2400, 800, 800)).toBe(-1);
  });

  it("keeps a centered section at neutral progress", () => {
    expect(getParallaxProgress(0, 800, 800)).toBe(0);
  });

  it("keeps background, far, and near layers at distinct speeds", () => {
    expect(getParallaxOffsets(0.5)).toEqual({
      backgroundY: 18,
      farY: -8,
      nearY: -14,
    });
  });
});
