import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/admin.module.css';
import AdminBar from '../../components/AdminBar';
import Pagination from '../../components/Pagination';
import { adminOnly } from '../../lib/adminSSR';
import { listAdmin } from '../../lib/posts';
import { formatDate } from '../../lib/blogConfig';
import { api } from '../../lib/clientApi';

export const getServerSideProps = adminOnly(async ({ query }) => {
  try {
    return { props: { ...(await listAdmin({ page: query.page })), loadError: false } };
  } catch (err) {
    console.error('[admin] could not load posts:', err.message);
    return { props: { posts: [], total: 0, totalPages: 1, page: 1, loadError: true } };
  }
});

function statusOf(p) {
  if (p.status === 'draft') return ['Draft', styles.draft];
  if (new Date(p.publishedAt) > new Date()) return ['Scheduled', styles.scheduled];
  return ['Live', styles.live];
}

export default function AdminPosts({ posts, total, totalPages, page, loadError }) {
  const router = useRouter();
  const [msg, setMsg] = useState(loadError ? { type: 'err', text: 'Could not load posts. Check the database connection and refresh.' } : null);
  const [busy, setBusy] = useState(false);

  async function remove(post) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setBusy(true);
    const r = await api(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
    setBusy(false);
    if (!r.ok) return setMsg({ type: 'err', text: r.error });
    setMsg({ type: 'ok', text: 'Post deleted.' });
    return router.replace(router.asPath);
  }

  async function importStarter() {
    setBusy(true);
    const r = await api('/api/admin/seed', { method: 'POST' });
    setBusy(false);
    if (!r.ok) return setMsg({ type: 'err', text: r.error });
    setMsg({ type: 'ok', text: `Imported ${r.data.imported} starter posts.` });
    return router.replace(router.asPath);
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
          <h1 className={styles.title}>Blog posts ({total})</h1>
          <Link href="/admin/posts/new" className={styles.btn}>+ New post</Link>
        </div>
        {msg && <div className={`${styles.notice} ${msg.type === 'ok' ? styles.ok : styles.err}`}>{msg.text}</div>}
        <div className={styles.card}>
          {posts.length === 0 ? (
            <div className={styles.empty}>
              <p>{loadError ? 'Posts could not be loaded.' : 'No posts yet.'}</p>
              {!loadError && (
                <p style={{ marginTop: 12 }}>
                  <button className={styles.btn} onClick={importStarter} disabled={busy}>{busy ? 'Importing…' : 'Import the 9 starter posts'}</button>
                </p>
              )}
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
                          <button className={`${styles.btn} ${styles.btnDanger} ${styles.small}`} disabled={busy} onClick={() => remove(p)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <Pagination basePath="/admin" page={page} totalPages={totalPages} />
      </main>
    </div>
  );
}
