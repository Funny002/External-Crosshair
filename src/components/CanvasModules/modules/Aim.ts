import * as Cross from './Cross.ts';

export const options: CanvasModuleOptions[] = Cross.options;

export const defaults: Record<string, any> = {
  dot: 1,
  width: 1,
  size: 20,
  interval: 0.3,
  color: '#000000',
};

export const setup = (ctx: CanvasRenderingContext2D, options: Record<string, any>) => {
  ctx.save();

  ctx.fillStyle = options.color;
  ctx.lineWidth = options.width;
  ctx.strokeStyle = options.color;

  // 圆环
  ctx.beginPath();
  ctx.arc(0, 0, options.size, 0, 2 * Math.PI);
  ctx.stroke();

  // 十字
  Cross.setup(ctx, options);

  ctx.restore();
};
