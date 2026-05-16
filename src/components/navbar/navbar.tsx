"use client";

import Image from "next/image";

import Button from "../button/button";
import styles from "./navbar.module.css";
import { whatsAppDefaultLink } from "@/modules/constants";
import { useLeadModal } from "@/contexts/lead-modal-context";

const Navbar = () => {
  const { openIntentModal, defaultSource } = useLeadModal();

  return (
    <nav className={styles.navbar}>
      <Image
        alt="Logo Acuidar"
        src="/logo.svg"
        width={120}
        height={45}
        priority
      />
      <div className={styles.whatsapp_cta}>

          <button
            type="button"
            className={styles.whatsapp_icon_button}
            onClick={() =>
              openIntentModal(defaultSource, whatsAppDefaultLink)
            }
          >
            <Image
              alt="Whatsapp"
              src="/whatsapp.svg"
              width={48}
              height={48}
              priority
            />
           </button>

        <div className={styles.whatsapp_button}>
          <Button
            width="220px"
            fontSize="14px"
          >
            Solicite um cuidador
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
