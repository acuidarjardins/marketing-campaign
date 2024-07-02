import Image from "next/image";
import styles from "./labor-issues.module.css";
import { Button } from "@/components";
import { LuMousePointerClick } from "react-icons/lu";

const LaborIssuesSection = () => (
  <section className={styles.section}>
    <Image
      alt="Foto de uma de nossas cuidadoras com uma de nossas clientes"
      src="/advertising_photo.png"
      width={340}
      height={340}
      className={styles.image}
    />
    <div className={styles.text_container}>
      <h3 className={styles.header}>
        <span>Conte com os serviços da Acuidar e </span>
        <span className={styles.header_span}>
          não se preocupe com questões trabalhistas
        </span>
      </h3>
      <p className={styles.content}>
        <span>Nossa empresa se encarrega do contato </span>
        <span>com o cuidador e de sua contratação.</span>
      </p>
      <Button width="15rem" background="#e7ecec" backgroundHover="#395358">
        <div className={styles.button_content}>
          Entre em contato
          <LuMousePointerClick size="1.5rem" color="#5a723c" />
        </div>
      </Button>
    </div>
  </section>
);

export default LaborIssuesSection;
