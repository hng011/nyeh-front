import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Snowfall from '../components/Snowfall.vue';

describe('Snowfall', () => {
  it('renders the snowfall container', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('.snowfall-container').exists()).toBe(true);
  });

  it('renders left and right sides', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('.snow-side-left').exists()).toBe(true);
    expect(wrapper.find('.snow-side-right').exists()).toBe(true);
  });

  it('renders snowflake elements on both sides', () => {
    const wrapper = mount(Snowfall);
    const leftFlakes = wrapper.find('.snow-side-left').findAll('.snowflake');
    const rightFlakes = wrapper.find('.snow-side-right').findAll('.snowflake');
    expect(leftFlakes.length).toBeGreaterThan(0);
    expect(rightFlakes.length).toBeGreaterThan(0);
  });

  it('renders 14 snowflakes on each side', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('.snow-side-left').findAll('.snowflake').length).toBe(14);
    expect(wrapper.find('.snow-side-right').findAll('.snowflake').length).toBe(14);
  });

  it('has aria-hidden for accessibility', () => {
    const wrapper = mount(Snowfall);
    expect(wrapper.find('.snowfall-container').attributes('aria-hidden')).toBe('true');
  });

  it('snowflakes have inline styles', () => {
    const wrapper = mount(Snowfall);
    const flake = wrapper.find('.snow-side-left').find('.snowflake');
    const style = flake.attributes('style');
    expect(style).toBeDefined();
    expect(style).toContain('animation');
  });
});
