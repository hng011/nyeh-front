import { describe, it, expect, vi } from 'vitest';
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

  it('renders a copy-to-clipboard button for the email', () => {
    const wrapper = mount(Contact);
    const buttons = wrapper.findAll('button');
    const emailButton = buttons.find((b) =>
      b.text().includes('hansnaufalgranito@gmail.com'),
    );
    expect(emailButton).toBeDefined();
  });

  it('copies the email to the clipboard on click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    const wrapper = mount(Contact);
    const buttons = wrapper.findAll('button');
    const emailButton = buttons.find((b) =>
      b.text().includes('hansnaufalgranito@gmail.com'),
    );
    await emailButton!.trigger('click');

    expect(writeText).toHaveBeenCalledWith('hansnaufalgranito@gmail.com');
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
