import { useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../../styles/admin.module.css';
import AdminBar from '../../../components/AdminBar';
import { adminOnly } from '../../../lib/adminSSR';
import { getById, CATEGORIES } from '../../../lib/posts';

export const getServerSideProps = adminOnly(async ({ params }) => {
  if (params.id === 'new') return { props: { post: null, categories: CATEGORIES } };
  if (!/^\d+$/.test(params.id)) return { notFound: true };
  const post = await getById(params.id);
  return post ? { props: { post, categories: CATEGORIES } } : { notFound: true };
});

// <input type="datetime-local"> works in the admin's local time; the DB stores UTC.
const toLocalInput = (iso) => {
  const d = iso ? new Date(iso) : new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const TOOLS = [
  ['H2', '<h2>', '</h2>'], ['H3', '<h3>', '</h3>'], ['Paragraph', '<p>', '</p>'],
  ['Bold', '<strong>', '</strong>'], ['Italic', '<em>', '</em>'],
  ['Bullet list', '<ul>\n  <li>', '</li>\n</ul>'], ['Numbered list', '<ol>\n  <li>', '</li>\n</ol>'],
  ['Quote', '<blockquote>', '</blockquote>'],
];

export default function PostEditor({ post, categories }) {
  const router = useRouter();
  const isNew = !post;
  const area = useRef(null);
  const [form, setForm] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    category: post?.category || categories[0],
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    author: post?.author || 'HorizonStream IPTV Team',
    status: post?.status || 'published',
    publishedAt: toLocalInput(post?.publishedAt),
  });
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function wrap(open, close) {
    const el = area.current;
    const { selectionStart: a, selectionEnd: b } = el;
    const next = form.content.slice(0, a) + open + form.content.slice(a, b) + close + form.content.slice(b);
    setForm((f) => ({ ...f, content: next }));
    requestAnimationFrame(() => { el.focus(); el.setSelectionRange(a + open.length, b + open.length); });
  }

  function addLink() {
    const url = window.prompt('Link URL (https://… or /free_trial)');
    if (url) wrap(`<a href="${url}">`, '</a>');
  }

  async function upload(file, intoContent) {
    if (!file) return;
    setMsg({ type: 'ok', text: 'Uploading image…' });
    const res = await fetch('/api/admin/upload', { method: 'POST', body: file });
    const data = await res.json();
    if (!res.ok) return setMsg({ type: 'err', text: data.error || 'Upload failed' });
    setMsg({ type: 'ok', text: 'Image uploaded.' });
    if (intoContent) wrap(`<img src="${data.url}" alt="" />`, '');
    else setForm((f) => ({ ...f, image: data.url }));
    return undefined;
  }

  async function save(statusOverride) {
    setBusy(true);
    setMsg(null);
    const body = { ...form, status: statusOverride || form.status, publishedAt: new Date(form.publishedAt).toISOString() };
    const res = await fetch(isNew ? '/api/admin/posts' : `/api/admin/posts/${post.id}`, {
      method: isNew ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ type: 'err', text: data.error || 'Save failed' });
    if (isNew) return router.replace(`/admin/posts/${data.post.id}`);
    setForm((f) => ({ ...f, slug: data.post.slug, status: data.post.status }));
    return setMsg({ type: 'ok', text: 'Saved.' });
  }

  return (
    <div className={styles.shell}>
      <Head>
        <title>{isNew ? 'New post' : 'Edit post'} | HorizonStream Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminBar />
      <main className={styles.wrap}>
        <div className={styles.head}>
          <h1 className={styles.title}>{isNew ? 'New post' : 'Edit post'}</h1>
          {!isNew && form.status === 'published' && <a className={`${styles.btn} ${styles.btnGhost}`} href={`/latest-news/${form.slug}`} target="_blank" rel="noopener noreferrer">View live ↗</a>}
        </div>
        {msg && <div className={`${styles.notice} ${msg.type === 'ok' ? styles.ok : styles.err}`}>{msg.text}</div>}

        <div className={styles.grid}>
          <div className={styles.panel}>
            <label className={styles.field}>
              <span className={styles.label}>Title</span>
              <input className={styles.input} value={form.title} onChange={set('title')} maxLength={255} placeholder="e.g. Best IPTV Subscription in 2026" />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Short summary (shown on the blog list and in Google)</span>
              <textarea className={styles.input} rows={3} value={form.excerpt} onChange={set('excerpt')} maxLength={600} />
              <span className={styles.hint}>{form.excerpt.length}/600 · aim for 140–160 characters</span>
            </label>
            <div className={styles.field}>
              <span className={styles.label}>Content (HTML)</span>
              <div className={styles.toolbar}>
                {TOOLS.map(([name, open, close]) => (
                  <button key={name} type="button" className={styles.tool} onClick={() => wrap(open, close)}>{name}</button>
                ))}
                <button type="button" className={styles.tool} onClick={addLink}>Link</button>
                <label className={styles.tool} style={{ cursor: 'pointer' }}>
                  Insert image
                  <input type="file" accept="image/*" hidden onChange={(e) => { upload(e.target.files[0], true); e.target.value = ''; }} />
                </label>
                <button type="button" className={styles.tool} onClick={() => setShowPreview((v) => !v)}>{showPreview ? 'Hide preview' : 'Preview'}</button>
              </div>
              <textarea ref={area} className={styles.textarea} value={form.content} onChange={set('content')} placeholder="<p>Write your post here…</p>" />
              {showPreview && <div className={styles.preview} dangerouslySetInnerHTML={{ __html: form.content }} />}
              <span className={styles.hint}>Select text, then click a button to wrap it. Scripts and unsafe code are removed automatically when you save.</span>
            </div>
          </div>

          <aside className={styles.panel}>
            <div className={styles.row}>
              <button className={styles.btn} disabled={busy} onClick={() => save('published')} style={{ flex: 1 }}>{busy ? 'Saving…' : form.status === 'published' && !isNew ? 'Update' : 'Publish'}</button>
              <button className={`${styles.btn} ${styles.btnGhost}`} disabled={busy} onClick={() => save('draft')}>Save draft</button>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>Category</span>
              <select className={styles.select} value={form.category} onChange={set('category')}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className={styles.field}>
              <span className={styles.label}>Publish date &amp; time</span>
              <input className={styles.input} type="datetime-local" value={form.publishedAt} onChange={set('publishedAt')} />
              <span className={styles.hint}>A future date schedules the post — it goes live automatically.</span>
            </label>
            <label className={styles.field}>
              <span className={styles.label}>URL slug</span>
              <input className={styles.input} value={form.slug} onChange={set('slug')} placeholder="auto from title" />
            </label>
            <div className={styles.field}>
              <span className={styles.label}>Featured image</span>
              {form.image && <img className={styles.thumb} src={form.image} alt="" />}
              <input className={styles.input} value={form.image} onChange={set('image')} placeholder="https://… or upload below" />
              <label className={`${styles.btn} ${styles.btnGhost} ${styles.small}`} style={{ justifyContent: 'center' }}>
                Upload image (max 5 MB)
                <input type="file" accept="image/*" hidden onChange={(e) => { upload(e.target.files[0], false); e.target.value = ''; }} />
              </label>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>Author</span>
              <input className={styles.input} value={form.author} onChange={set('author')} maxLength={120} />
            </label>
          </aside>
        </div>
      </main>
    </div>
  );
}
