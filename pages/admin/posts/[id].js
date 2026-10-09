import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../../styles/admin.module.css';
import AdminBar from '../../../components/AdminBar';
import RichEditor from '../../../components/RichEditor';
import { adminOnly } from '../../../lib/adminSSR';
import { getById, CATEGORIES } from '../../../lib/posts';
import { api } from '../../../lib/clientApi';

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

const hasContent = (html) => /<img\b/i.test(html) || html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;

export default function PostEditor({ post, categories }) {
  const router = useRouter();
  const isNew = !post;
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

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Uploads a picture and returns its address (or null after showing the error)
  async function uploadFile(file) {
    if (!file) return null;
    if (file.size > 5 * 1024 * 1024) { setMsg({ type: 'err', text: 'Image is larger than 5 MB' }); return null; }
    setMsg({ type: 'ok', text: 'Uploading image…' });
    const r = await api('/api/admin/upload', { method: 'POST', raw: file });
    if (!r.ok) { setMsg({ type: 'err', text: r.error }); return null; }
    setMsg({ type: 'ok', text: 'Image uploaded.' });
    return r.data.url;
  }

  async function uploadFeatured(file) {
    const url = await uploadFile(file);
    if (url) setForm((f) => ({ ...f, image: url }));
  }

  async function save(statusOverride) {
    if (!form.title.trim()) return setMsg({ type: 'err', text: 'Please write a title first' });
    if (!hasContent(form.content)) return setMsg({ type: 'err', text: 'The post is empty. Write something in the big box first' });
    const when = new Date(form.publishedAt);
    if (Number.isNaN(when.getTime())) return setMsg({ type: 'err', text: 'Choose a valid publish date' });

    setBusy(true);
    setMsg(null);
    const r = await api(isNew ? '/api/admin/posts' : `/api/admin/posts/${post.id}`, {
      method: isNew ? 'POST' : 'PUT',
      body: { ...form, status: statusOverride || form.status, publishedAt: when.toISOString() },
    });
    setBusy(false);
    if (!r.ok) return setMsg({ type: 'err', text: r.error });
    if (isNew) return router.replace(`/admin/posts/${r.data.post.id}`);
    setForm((f) => ({ ...f, slug: r.data.post.slug, excerpt: r.data.post.excerpt, status: r.data.post.status }));
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
            <div className={styles.field}>
              <span className={styles.label}>Write your post</span>
              <RichEditor
                value={form.content}
                onChange={(html) => setForm((f) => ({ ...f, content: html }))}
                onUploadImage={uploadFile}
                onError={(text) => setMsg({ type: 'err', text })}
              />
              <span className={styles.hint}>Type like in Word. Select a line and use the buttons for headings, bold, lists, links and pictures. You can also paste text from Word or Google Docs.</span>
            </div>
            <label className={styles.field}>
              <span className={styles.label}>Short summary (shown on the blog list and in Google) — optional</span>
              <textarea className={styles.input} rows={3} value={form.excerpt} onChange={set('excerpt')} maxLength={600} placeholder="Leave empty and we will use the first lines of your post" />
              <span className={styles.hint}>{form.excerpt.length}/600 · best length is 140–160 characters</span>
            </label>
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
              <span className={styles.label}>Web address (URL slug) — optional</span>
              <input className={styles.input} value={form.slug} onChange={set('slug')} placeholder="made from the title automatically" />
            </label>
            <div className={styles.field}>
              <span className={styles.label}>Main picture</span>
              {form.image && <img className={styles.thumb} src={form.image} alt="" />}
              <input className={styles.input} value={form.image} onChange={set('image')} placeholder="https://… or upload below" />
              <label className={`${styles.btn} ${styles.btnGhost} ${styles.small}`} style={{ justifyContent: 'center' }}>
                Upload picture (max 5 MB)
                <input type="file" accept="image/*" hidden onChange={(e) => { uploadFeatured(e.target.files[0]); e.target.value = ''; }} />
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
