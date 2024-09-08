import { setup as setupDot } from './Dot.ts';

export const options: CanvasModuleOptions[] = [
  { name: 'size', label: '准星大小', type: 'number', min: 1, max: 0, docs: '' },
  { name: 'width', label: '准星厚度', type: 'number', min: 1, max: 0, docs: '' },
  { name: 'interval', label: '准星间隔', type: 'number', min: 0, max: 1, step: 0.01, docs: '' },
  { name: 'dot', label: '圆点大小', type: 'number', min: 0, max: 0, docs: '' },
  { name: 'color', label: '准星颜色', type: 'color', min: 0, max: 0, docs: '' },
];

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

  // 十字
  function cross() {
    ctx.beginPath();
    ctx.moveTo(0, options.size * options.interval);
    ctx.lineTo(0, options.size);
    ctx.stroke();
  }

  for (let i = 0; i < 4; i++) {
    ctx.rotate((i * 90) * Math.PI / 180);
    cross();
  }

  // 圆点
  setupDot(ctx, options);

  ctx.restore();
};
