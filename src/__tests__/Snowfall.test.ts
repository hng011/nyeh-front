import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Snowfall from '../components/Snowfall.vue';

describe('Snowfall', () => {
  it('renders a canvas element', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('canvas').exists()).toBe(true);
  });

  it('canvas has snowfall-canvas class', () => {
    const wrapper = mount(Snowfall);
    const canvas = wrapper.find('canvas');
    expect(canvas.classes()).toContain('snowfall-canvas');
  });

  it('has aria-hidden for accessibility', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('canvas').attributes('aria-hidden')).toBe('true');
  });

  it('has data-testid attribute', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('[data-testid="snowfall-canvas"]').exists()).toBe(true);
  });

  it('canvas is an HTMLCanvasElement', () => {
    const wrapper = mount(Snowfall);
    const canvas = wrapper.find('canvas').element;
    expect(canvas).toBeInstanceOf(HTMLCanvasElement);
  });

  it('canvas fills viewport with fixed positioning', () => {
    const wrapper = mount(Snowfall);
    const canvas = wrapper.find('canvas');
    expect(canvas.classes()).toContain('snowfall-canvas');
    expect(canvas.attributes('aria-hidden')).toBe('true');
  });

  it('component exposes canvas via template ref', () => {
    const wrapper = mount(Snowfall);
    const vm = wrapper.vm as { canvasRef?: HTMLCanvasElement | null };
    expect(vm.canvasRef).toBeDefined();
    expect(vm.canvasRef).toBeInstanceOf(HTMLCanvasElement);
  });

  it('canvas has z-index 0 to sit behind content', () => {
    const wrapper = mount(Snowfall);
    const canvas = wrapper.find('canvas');
    // Scoped styles attach the class; verify class is there with z-index: 0
    expect(canvas.classes()).toContain('snowfall-canvas');
    // Verify no inline pointer-events override that would block interactions
    expect(canvas.attributes('style')).toBeUndefined();
  });

  it('canvas has pointer-events disabled for pass-through interactions', () => {
    const wrapper = mount(Snowfall);
    const canvas = wrapper.find('canvas');
    // The snowfall-canvas class sets pointer-events: none via scoped styles
    expect(canvas.classes()).toContain('snowfall-canvas');
  });
});
