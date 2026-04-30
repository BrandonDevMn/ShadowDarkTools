// Static list of home-feed posts in reverse-chronological order.
// Add new entries to the top of this array to show them first.
const POSTS = [
  {
    id: 'welcome',
    date: 'April 30, 2026',
    title: 'Welcome to Shadowdark Tools',
    body: 'Hello! This is a companion app for playing Shadowdark — a rules-light, old-school tabletop RPG that keeps the focus at the table. Use the tools here to roll dice, generate characters, and look up game info, all from your phone.',
  },
];

/**
 * Renders a reverse-chronological list of posts into the given container.
 *
 * Each post is an <article> card with a date, title, and body. The posts
 * array is static — new entries are added to the top of POSTS above.
 *
 * Returns true on success, false if container is not a valid Element.
 *
 * @param {Element|null|undefined} container
 * @returns {boolean}
 */
export function renderHomeFeed(container) {
  if (!container || !(container instanceof Element)) {
    return false;
  }

  const feed = document.createElement('div');
  feed.className = 'home-feed';

  POSTS.forEach(({ date, title, body }) => {
    const post = document.createElement('article');
    post.className = 'home-feed__post';

    const dateEl = document.createElement('p');
    dateEl.className = 'home-feed__post-date';
    dateEl.textContent = date;

    const titleEl = document.createElement('h2');
    titleEl.className = 'home-feed__post-title';
    titleEl.textContent = title;

    const bodyEl = document.createElement('p');
    bodyEl.className = 'home-feed__post-body';
    bodyEl.textContent = body;

    post.appendChild(dateEl);
    post.appendChild(titleEl);
    post.appendChild(bodyEl);
    feed.appendChild(post);
  });

  container.appendChild(feed);
  return true;
}
