import { defineAsyncComponent, defineComponent, h } from 'vue';

function handlerSvg(target: Record<string, Function>) {
  const svg_list = Object.keys(target).map(path => {
    const name = path.split(/([\\|\/])+/).pop()?.split('.')[0];
    return [name, defineAsyncComponent(() => new Promise(resolve => {
      target[path]().then((svg: string) => {
        // @ts-ignore
        resolve(defineComponent({
          setup: () => () => h('i', { style: { display: 'inline-block' }, innerHTML: svg }),
        }));
      });
    }))];
  });
  return Object.fromEntries(svg_list);
}

export const regular = handlerSvg(import.meta.glob('./regular/*.svg', { as: 'raw' })); // eager: true
export const brands = handlerSvg(import.meta.glob('./brands/*.svg', { as: 'raw' })); // eager: true
export const solid = handlerSvg(import.meta.glob('./solid/*.svg', { as: 'raw' })); // eager: true

export default { ...brands, ...solid };
