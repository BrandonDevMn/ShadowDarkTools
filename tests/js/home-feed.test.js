import { describe, it, expect, beforeEach } from 'vitest';
import { renderHomeFeed } from '../../app/js/home-feed.js';

describe('renderHomeFeed', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
  });

  // ── Structure ───────────────────────────────────────────────────────────

  it('returns true when given a valid container', () => {
    expect(renderHomeFeed(container)).toBe(true);
  });

  it('renders a feed wrapper element', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed')).not.toBeNull();
  });

  it('renders at least one post', () => {
    renderHomeFeed(container);
    expect(container.querySelectorAll('.home-feed__post').length).toBeGreaterThan(0);
  });

  // ── First post content ──────────────────────────────────────────────────

  it('first post has a date element', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed__post-date')).not.toBeNull();
  });

  it('first post date is non-empty', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed__post-date').textContent.length).toBeGreaterThan(0);
  });

  it('first post has a title element', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed__post-title')).not.toBeNull();
  });

  it('first post title mentions Shadowdark', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed__post-title').textContent).toMatch(/shadowdark/i);
  });

  it('first post has a body element', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed__post-body')).not.toBeNull();
  });

  it('first post body is non-empty', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed__post-body').textContent.length).toBeGreaterThan(0);
  });

  it('first post body mentions Shadowdark', () => {
    renderHomeFeed(container);
    expect(container.querySelector('.home-feed__post-body').textContent).toMatch(/shadowdark/i);
  });

  // ── Post element type ───────────────────────────────────────────────────

  it('each post is rendered as an <article>', () => {
    renderHomeFeed(container);
    container.querySelectorAll('.home-feed__post').forEach((post) => {
      expect(post.tagName.toLowerCase()).toBe('article');
    });
  });

  // ── Invalid container ───────────────────────────────────────────────────

  it('returns false when container is null', () => {
    expect(renderHomeFeed(null)).toBe(false);
  });

  it('returns false when container is undefined', () => {
    expect(renderHomeFeed(undefined)).toBe(false);
  });

  it('returns false when container is not an Element', () => {
    expect(renderHomeFeed('#home')).toBe(false);
  });
});
