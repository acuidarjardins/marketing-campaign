import Image from "next/image";
import {
  whatsAppAlternativeLink,
  whatsAppDefaultLink,
} from "@/modules/constants";

import Button from "../button/button";
import styles from "./navbar.module.css";

const Navbar = ({ useAlternativeLink }: { useAlternativeLink?: boolean }) => (
  <nav className={styles.navbar}>
    <Image
      alt="Logo Acuidar"
      src="/logo.svg"
      width={120}
      height={45}
      priority
    />
    <div className={styles.whatsapp_cta}>
      <a
        href={
          useAlternativeLink ? whatsAppAlternativeLink : whatsAppDefaultLink
        }
      >
        <Image
          alt="Whatsapp"
          src="/whatsapp.svg"
          width={48}
          height={48}
          priority
        />
      </a>
      <div className={styles.whatsapp_button}>
        <Button width="220px" fontSize="14px">
          Solicite um cuidador
        </Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
