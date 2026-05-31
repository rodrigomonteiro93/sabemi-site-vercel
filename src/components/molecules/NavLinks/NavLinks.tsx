import styles from './NavLinks.module.css';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}
interface NavLinksProps {
  items: NavItem[];
}

export default function NavLinks({ items }: NavLinksProps) {
  return (
    <ul className={styles.navLinks}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className={[styles.link, item.active ? styles.active : ''].filter(Boolean).join(' ')}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
