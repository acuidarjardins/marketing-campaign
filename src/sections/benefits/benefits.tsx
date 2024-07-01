import { Children, ReactNode } from "react";

import { VscBook } from "react-icons/vsc";
import { BsHouseDoor } from "react-icons/bs";
import { PiHeartbeat } from "react-icons/pi";
import { FaPeopleRoof } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { MdPublishedWithChanges } from "react-icons/md";
import { LiaCarSideSolid, LiaUserNurseSolid } from "react-icons/lia";

import styles from "./benefits.module.css";

const BenefitsSection = () => {
  const benefits: GridItemProps[] = [
    {
      icon: <BsHouseDoor size={50} color="#78a046" />,
      text: "Atendimento em casa ou no hospital",
    },
    {
      icon: <LiaUserNurseSolid size={50} color="#78a046" />,
      text: "Avaliação inicial com enfermeira sem custo",
    },
    {
      icon: <GrDocumentText size={50} color="#78a046" />,
      text: "Envio de relatórios diários para a família",
    },
    {
      icon: <PiHeartbeat size={50} color="#78a046" />,
      text: "Supervisão periódica dos assistidos",
    },
    {
      icon: <FaPeopleRoof size={50} color="#78a046" />,
      text: "Contato frequente com a família do assistido",
    },
    {
      icon: <VscBook size={50} color="#78a046" />,
      text: "Treinamento e capacitações frequentes dos nossos cuidadores",
    },
    {
      icon: <LiaCarSideSolid size={50} color="#78a046" />,
      text: "Nos encarregamos do transporte dos cuidadores",
    },
    {
      icon: <MdPublishedWithChanges size={50} color="#78a046" />,
      text: "Cuidamos da substituição do cuidador em caso de ausência",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Dedique seu tempo às suas atribuições, entregando à Acuidar a
        responsabilidade de cuidar do seu familiar
      </h2>
      <div className={styles.grid}>
        {Children.toArray(
          benefits.map(({ icon, text }) => <GridItem icon={icon} text={text} />)
        )}
      </div>
    </section>
  );
};

type GridItemProps = { icon: ReactNode; text: string };
const GridItem = ({ icon, text }: GridItemProps) => (
  <div className={styles.item_container}>
    {icon}
    <p>{text}</p>
  </div>
);

export default BenefitsSection;
