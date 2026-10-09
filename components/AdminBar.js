import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/admin.module.css';

export default function AdminBar() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }
  return (
    <header className={styles.bar}>
      <Link href="/admin" className={styles.brand}>Horizon<span>Stream</span> Admin</Link>
      <nav className={styles.barLinks}>
        <Link href="/admin">Posts</Link>
        <Link href="/admin/posts/new">New post</Link>
        <a href="/latest-news" target="_blank" rel="noopener noreferrer">View blog ↗</a>
        <button className={`${styles.btn} ${styles.btnGhost} ${styles.small}`} onClick={logout}>Log out</button>
      </nav>
    </header>
  );
}
