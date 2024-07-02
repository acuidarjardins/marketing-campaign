import { Children, ReactNode } from "react";

import styles from "./google-reviews.module.css";
import Image from "next/image";
import { Carousel } from "@/components";

const GoogleReviewsSection = () => {
  const reviews: CarouselItemProps[] = [
    {
      image: "/google_review_1.png",
      name: "Maria Regina Branco",
      text: "Minha mãe precisou de uma cuidadora para acompanha-la por 24 horas para um exame de colonoscopia. Contatamos a empresa em última hora e prontamente nos ajudaram alocando uma cuidadora técnica de enfermagem muito atenciosa e amorosa. A comunicação com a cuidadora e com a enfermeira responsável foi muito rápida e nos atualizaram a todo momento dos procedimentos. Gostei muito da experiência.",
    },
    {
      image: "/google_review_2.png",
      name: "Jacqueline Stefanelli",
      text: "Contratei os serviços da Acuidar Jardins para minha mãe que precisou ser hospitalizada e fui super bem atendida pelo Marcel, enfermeira Dani e a cuidadora Rose que foi muito querida e carinhosa comigo e com a minha mãe. O atendimento foi super rápido, organizado, simplesmente impecável em cada detalhe. Eu só posso recomendar mil vezes.",
    },
    {
      image: "/google_review_3.png",
      name: "Diego Galdino",
      text: "Indico com toda certeza a Acuidar do Marcel. O suporte, o acompanhamento e o carinho que foi dado para minha família em um momento de dificuldade jamais será esquecido. Obrigado à toda equipe e aos cuidadores que nos acompanharam",
    },
    {
      image: "/google_review_4.png",
      name: "Alexsandro Carvalho",
      text: "Contratei o serviço da Acuidar para cuidar de meu pai por 15 dias enquanto viajávamos para trabalhar fora de São Paulo. Nesse período, fiquei bastante satisfeito com o tratamento e zelo que recebemos por toda equipe administrativa e, principalmente, do cuidador Marcos. Parabéns pelo serviço de excelência que foi prestado.",
    },
    {
      image: "/google_review_5.png",
      name: "David Franca",
      text: "Estamos desde setembro deste ano com a Acuidar e a babá Juliana e posso dizer que eu e meu marido estamos totalmente satisfeitos com o acolhimento e suporte que tem sido feito por toda a equipe. O meu mais profundo agradecimento por tudo que vocês têm nos proporcionado.",
    },
    {
      image: "/google_review_6.png",
      name: "Lilian Botelho",
      text: "Excelente atendimento!! Profissionais dedicados e atenciosos, nesse momento que precisamos de toda delicadeza e humanidade possível!! Obrigada a todos os profissionais envolvidos no atendimento.",
    },
    {
      image: "/google_review_7.png",
      name: "Juliana Higuchi",
      text: "Minha família contratou os serviços de plantão de cuidador hospitalar e fomos extremamente bem atendidos pela equipe da Acuidar Jardins. Nos responderam imediatamente, já encaminhando um contrato de prestação de serviços, com todos os termos bem delimitados. As cuidadoras Valéria e Andreza são excelentes, tiveram muita atenção e cuidado com uma paciente idosa, que necessitava de cuidados especiais. Estamos muito satisfeitos e temos apenas elogios à empresa!",
    },
    {
      image: "/google_review_8.png",
      name: "Rosangela Spadari",
      text: "Eu sou cuidadora e tenho muitos anos na profissão e já trabalhei em muitas empresas e de todas as outras empresas que trabalhei nunca me senti tão acolhida e tão bem acessorada não hora nem dia para nós auxiliar com qualquer problema e os assistindos adoram o Marcel ele é tão atencioso e está sempre pronto em ajudar . Parabéns A Cuidar Jardim estou muito satisfeita em fazer parte dessa empresa .👍👍",
    },
    {
      image: "/google_review_9.png",
      name: "Rodrigo Ibanez",
      text: "Só tenho que agradecer o entendimento prestado. Tive problemas em família, momento de grande dificuldade, e a empresa prestou o atendimento com qualidade e eficiência. O responsável pelo atendimento tomou todos os cuidados para que o trabalho fosse prestado de modo a amenizar o desgaste familiar, sendo que isso foi de grande relevância e importância. A quem possa interessar, recomendo os serviços desta empresa.",
    },
    {
      image: "/google_review_10.png",
      name: "Stefanie Matos",
      text: "Não tem outra explicação a não ser que, realmente foi Deus encontrar a Acuidar. Marcel, fica a frente da empresa e foi totalmente cuidadoso, respeitoso e atencioso com nossa situação. Enfermeira Danielle, em pleno feriado visitou e pontuou tudo tão claramente, foi mais do que tudo HUMANA. E por fim enviaram uma cuidadora maravilhosa, respeitosa e de um profissionalismo desigual. Gratidão por tudo, indico a Acuidar de olhos fechados, pois tenho plena certeza que qualquer pessoa será bem cuidada, assistida e AMADA.",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <span>Somos uma empresa</span>
        <span>5 estrelas no Google</span>
      </h2>
      <Image
        alt="Avaliação 5 estrelas Google"
        src="/banner_google_reviews.png"
        height={50}
        width={186}
      />
      <div className={styles.carousel}>
        <Carousel
          items={Children.toArray(
            reviews.map(({ image, text, name }) => (
              <CarouselItem image={image} name={name} text={text} />
            ))
          )}
          containerClassName={styles.carousel_container}
          slideClassName={styles.carousel_slide}
        />
      </div>
    </section>
  );
};

type CarouselItemProps = { image: string; name: string; text: string };

const CarouselItem = ({ image, name, text }: CarouselItemProps) => (
  <div className={styles.carousel_item}>
    <Image alt={name} src={image} height={50} width={50} />
    <p className={styles.carousel_name}>{name}</p>
    <Image
      alt="Avaliação 5 estrelas Google"
      src="/five_stars.png"
      height={30}
      width={118}
    />
    <p className={styles.carousel_text}>{text}</p>
  </div>
);

export default GoogleReviewsSection;
