import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import styles from '../styles/admin.module.css';

// Word-style editor: the admin never sees HTML unless they open the "HTML" tab on purpose.
// value/onChange work with an HTML string, which is what the database stores.
export default function RichEditor({ value, onChange, onUploadImage, onError }) {
  const [htmlMode, setHtmlMode] = useState(false);

  const editor = useEditor({
    immediatelyRender: false, // Next.js renders on the server first
    shouldRerenderOnTransaction: true, // keep the toolbar buttons (bold, list...) in sync with the cursor
    extensions: [
      // Tiptap 3 ships Link inside StarterKit
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer' } },
      }),
      Image,
    ],
    content: value || '',
    onUpdate: ({ editor: ed }) => onChange(ed.isEmpty ? '' : ed.getHTML()),
  });

  if (!editor) return <div className={styles.editorLoading}>Loading editor…</div>;

  const run = (fn) => () => fn(editor.chain().focus()).run();
  const active = (name, attrs) => (editor.isActive(name, attrs) ? styles.toolOn : '');

  function setLink() {
    const previous = editor.getAttributes('link').href || '';
    const url = window.prompt('Link address (https://… or /free_trial). Leave empty to remove the link.', previous);
    if (url === null) return;
    if (url.trim() === '') return editor.chain().focus().extendMarkRange('link').unsetLink().run();
    if (!/^(https?:\/\/|\/|mailto:|tel:)/i.test(url.trim())) return onError('Link must start with https:// or /');
    return editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }

  async function addImage(file) {
    if (!file) return;
    const url = await onUploadImage(file);
    if (url) editor.chain().focus().setImage({ src: url, alt: '' }).run();
  }

  function toggleHtml() {
    if (htmlMode) editor.commands.setContent(value || '', false); // coming back: load the edited HTML
    setHtmlMode((v) => !v);
  }

  return (
    <div className={styles.editorWrap}>
      <div className={styles.toolbar}>
        <select
          className={styles.toolSelect}
          value={editor.isActive('heading', { level: 2 }) ? 'h2' : editor.isActive('heading', { level: 3 }) ? 'h3' : 'p'}
          onChange={(e) => {
            const v = e.target.value;
            if (v === 'p') editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: Number(v[1]) }).run();
          }}
          disabled={htmlMode}
          aria-label="Text style"
        >
          <option value="p">Normal text</option>
          <option value="h2">Big heading</option>
          <option value="h3">Small heading</option>
        </select>
        <button type="button" className={`${styles.tool} ${active('bold')}`} onClick={run((c) => c.toggleBold())} disabled={htmlMode} title="Bold (Ctrl+B)"><b>B</b></button>
        <button type="button" className={`${styles.tool} ${active('italic')}`} onClick={run((c) => c.toggleItalic())} disabled={htmlMode} title="Italic (Ctrl+I)"><i>I</i></button>
        <button type="button" className={`${styles.tool} ${active('bulletList')}`} onClick={run((c) => c.toggleBulletList())} disabled={htmlMode}>• List</button>
        <button type="button" className={`${styles.tool} ${active('orderedList')}`} onClick={run((c) => c.toggleOrderedList())} disabled={htmlMode}>1. List</button>
        <button type="button" className={`${styles.tool} ${active('blockquote')}`} onClick={run((c) => c.toggleBlockquote())} disabled={htmlMode}>“ Quote</button>
        <button type="button" className={`${styles.tool} ${active('link')}`} onClick={setLink} disabled={htmlMode}>🔗 Link</button>
        <label className={styles.tool} style={{ cursor: htmlMode ? 'not-allowed' : 'pointer' }}>
          🖼 Image
          <input type="file" accept="image/*" hidden disabled={htmlMode} onChange={(e) => { addImage(e.target.files[0]); e.target.value = ''; }} />
        </label>
        <button type="button" className={styles.tool} onClick={run((c) => c.undo())} disabled={htmlMode}>↶ Undo</button>
        <button type="button" className={styles.tool} onClick={run((c) => c.redo())} disabled={htmlMode}>↷ Redo</button>
        <button type="button" className={`${styles.tool} ${htmlMode ? styles.toolOn : ''}`} onClick={toggleHtml} style={{ marginLeft: 'auto' }}>{htmlMode ? '← Back to editor' : 'HTML'}</button>
      </div>

      {htmlMode ? (
        <textarea className={styles.textarea} value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} />
      ) : (
        <EditorContent editor={editor} className={styles.editorArea} />
      )}
    </div>
  );
}
