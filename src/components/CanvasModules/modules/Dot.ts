export const options: CanvasModuleOptions[] = [
  { name: 'dot', label: '圆点大小', type: 'number', min: 1, max: 0, docs: '' },
  { name: 'color', label: '准星颜色', type: 'color', min: 0, max: 0, docs: '' },
];

export const defaults: Record<string, any> = {
  dot: 1,
  color: '#000000',
};

export const setup = (ctx: CanvasRenderingContext2D, options: Record<string, any>) => {
  ctx.save();

  ctx.fillStyle = options.color;
  ctx.lineWidth = options.width;
  ctx.strokeStyle = options.color;

  // 圆点
  ctx.beginPath();
  ctx.arc(0, 0, options.dot, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};
