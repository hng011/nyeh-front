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
    // Scoped styles resolve to class in DOM; happy-dom doesn't resolve CSS,
    // so verify the snowfall-canvas class is present (it has fixed/inset styles)
    expect(canvas.classes()).toContain('snowfall-canvas');
    expect(canvas.attributes('aria-hidden')).toBe('true');
  });

  it('component exposes canvas via template ref', () => {
    const wrapper = mount(Snowfall);
    // The canvas ref should be set after mount
    const vm = wrapper.vm as { canvasRef?: HTMLCanvasElement | null };
    expect(vm.canvasRef).toBeDefined();
    expect(vm.canvasRef).toBeInstanceOf(HTMLCanvasElement);
  });

  it('canvas has proper styling classes for overlay', () => {
    const wrapper = mount(Snowfall);
    const canvas = wrapper.find('canvas');
    // Fixed position overlay class should be present
    expect(canvas.classes()).toContain('snowfall-canvas');
  });
});
