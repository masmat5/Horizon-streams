import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/admin.module.css';
import AdminBar from '../../components/AdminBar';
import { adminOnly } from '../../lib/adminSSR';
import { listAll } from '../../lib/posts';
import { formatDate } from '../../lib/blogConfig';

export const getServerSideProps = adminOnly(async () => ({ props: { initialPosts: await listAll() } }));

function statusOf(p) {
  if (p.status === 'draft') return ['Draft', styles.draft];
  if (new Date(p.publishedAt) > new Date()) return ['Scheduled', styles.scheduled];
  return ['Live', styles.live];
}

export default function AdminPosts({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState(false);

  async function remove(post) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts((list) => list.filter((p) => p.id !== post.id));
      setMsg({ type: 'ok', text: 'Post deleted.' });
    } else {
      setMsg({ type: 'err', text: (await res.json()).error || 'Delete failed' });
    }
  }

  async function importStarter() {
    setBusy(true);
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      const list = await (await fetch('/api/admin/posts')).json();
      setPosts(list.posts);
      setMsg({ type: 'ok', text: `Imported ${data.imported} starter posts.` });
    } else {
      setMsg({ type: 'err', text: data.error || 'Import failed' });
    }
    setBusy(false);
  }

  return (
    <div className={styles.shell}>
      <Head>
        <title>Posts | HorizonStream Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminBar />
      <main className={styles.wrap}>
        <div className={styles.head}>
          <h1 className={styles.title}>Blog posts ({posts.length})</h1>
          <Link href="/admin/posts/new" className={styles.btn}>+ New post</Link>
        </div>
        {msg && <div className={`${styles.notice} ${msg.type === 'ok' ? styles.ok : styles.err}`}>{msg.text}</div>}
        <div className={styles.card}>
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>No posts yet.</p>
              <p style={{ marginTop: 12 }}>
                <button className={styles.btn} onClick={importStarter} disabled={busy}>{busy ? 'Importing…' : 'Import the 9 starter posts'}</button>
              </p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr><th>Post</th><th>Status</th><th>Category</th><th>Date</th><th /></tr>
              </thead>
              <tbody>
                {posts.map((p) => {
                  const [label, cls] = statusOf(p);
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link href={`/admin/posts/${p.id}`} className={styles.postTitle}>{p.title}</Link>
                        <span className={styles.postSlug}>/latest-news/{p.slug}</span>
                      </td>
                      <td><span className={`${styles.badge} ${cls}`}>{label}</span></td>
                      <td>{p.category}</td>
                      <td>{formatDate(p.publishedAt)}</td>
                      <td>
                        <div className={styles.actions}>
                          {label === 'Live' && <a className={`${styles.btn} ${styles.btnGhost} ${styles.small}`} href={`/latest-news/${p.slug}`} target="_blank" rel="noopener noreferrer">View</a>}
                          <Link className={`${styles.btn} ${styles.btnGhost} ${styles.small}`} href={`/admin/posts/${p.id}`}>Edit</Link>
                          <button className={`${styles.btn} ${styles.btnDanger} ${styles.small}`} onClick={() => remove(p)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
