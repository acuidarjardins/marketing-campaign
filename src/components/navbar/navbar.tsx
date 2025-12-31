import Image from "next/image";

import Button from "../button/button";
import styles from "./navbar.module.css";
 type NavbarProps = {
  isLeadsterCTA?: boolean;
 }

const Navbar = ({ isLeadsterCTA }: NavbarProps) => (
  <nav className={styles.navbar}>
    <Image
      alt="Logo Acuidar"
      src="/logo.svg"
      width={120}
      height={45}
      priority
    />
    <div className={styles.whatsapp_cta}>
      <div className={isLeadsterCTA ? "leadster-cta" : ""}>
        <Image
          alt="Whatsapp"
          src="/whatsapp.svg"
          width={48}
          height={48}
          priority
        />
      </div>
      <div className={styles.whatsapp_button}>
        <Button isLeadsterCTA={isLeadsterCTA} width="220px" fontSize="14px">
          Solicite um cuidador
        </Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
