import styles from "./footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <span>ACUIDAR SP JARDINS © 2024</span>
    <span className={styles.footer_complement}>
      - Todos os direitos reservados
    </span>
  </footer>
);

export default Footer;
