import Image from "next/image";

import Button from "../button/button";
import styles from "./navbar.module.css";
import { whatsAppLink } from "@/modules/constants";

const Navbar = () => (
  <nav className={styles.navbar}>
    <Image
      alt="Logo Acuidar"
      src="/logo.svg"
      width={120}
      height={45}
      priority
    />
    <div className={styles.whatsapp_cta}>
      <a href={whatsAppLink}>
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
