import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Snowfall from '../components/Snowfall.vue';

describe('Snowfall', () => {
  it('renders a canvas element', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('canvas.snowfall-canvas').exists()).toBe(true);
  });

  it('has aria-hidden for accessibility', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('canvas').attributes('aria-hidden')).toBe('true');
  });

  it('mounts and unmounts without throwing', () => {
    const wrapper = mount(Snowfall);
    expect(() => wrapper.unmount()).not.toThrow();
  });
});
