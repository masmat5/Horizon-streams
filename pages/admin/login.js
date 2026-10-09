import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/admin.module.css';
import { getSession } from '../../lib/auth';
import { api } from '../../lib/clientApi';

export async function getServerSideProps({ req }) {
  if (getSession(req)) return { redirect: { destination: '/admin', permanent: false } };
  return { props: {} };
}

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const r = await api('/api/admin/login', { method: 'POST', body: { email, password }, loginRedirect: false });
    if (!r.ok) {
      setError(r.error);
      setBusy(false);
      return;
    }
    router.push('/admin');
  }

  return (
    <div className={styles.loginWrap}>
      <Head>
        <title>Admin Login | HorizonStream IPTV</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <form className={styles.loginCard} onSubmit={submit}>
        <div className={styles.brand}>Horizon<span>Stream</span> Admin</div>
        {error && <div className={`${styles.notice} ${styles.err}`}>{error}</div>}
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Password</span>
          <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </label>
        <button className={styles.btn} disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}
