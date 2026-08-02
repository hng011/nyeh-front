import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Contact from '../components/Contact.vue';

describe('Contact', () => {
  it('renders GitHub link with correct href', () => {
    const wrapper = mount(Contact);
    const links = wrapper.findAll('a');
    const githubLink = links.find((l) => l.text().trim() === 'GitHub');
    expect(githubLink).toBeDefined();
    expect(githubLink!.attributes('href')).toBe('https://github.com/hng011');
  });

  it('GitHub link opens in new tab', () => {
    const wrapper = mount(Contact);
    const links = wrapper.findAll('a');
    const githubLink = links.find((l) => l.text().trim() === 'GitHub');
    expect(githubLink!.attributes('target')).toBe('_blank');
    expect(githubLink!.attributes('rel')).toBe('noopener noreferrer');
  });

  it('renders email link', () => {
    const wrapper = mount(Contact);
    const links = wrapper.findAll('a');
    const emailLink = links.find((l) =>
      l.text().includes('hansnaufalgranito@gmail.com'),
    );
    expect(emailLink).toBeDefined();
    expect(emailLink!.attributes('href')).toBe(
      'mailto:hansnaufalgranito@gmail.com',
    );
  });

  it('renders LinkedIn link with correct href', () => {
    const wrapper = mount(Contact);
    const links = wrapper.findAll('a');
    const linkedinLink = links.find((l) => l.text().trim() === 'LinkedIn');
    expect(linkedinLink).toBeDefined();
    expect(linkedinLink!.attributes('href')).toBe(
      'https://www.linkedin.com/in/hansnaufalgranito',
    );
  });
});
