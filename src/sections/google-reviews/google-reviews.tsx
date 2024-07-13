import { Children, ReactNode } from "react";

import styles from "./google-reviews.module.css";
import Image from "next/image";
import { Button, Carousel } from "@/components";

const GoogleReviewsSection = () => {
  const reviews: CarouselItemProps[] = [
    {
      image: "/google_review_stefanie.png",
      name: "Stefanie Matos",
      text: [
        "Não tem outra explicação a não ser que, realmente foi Deus encontrar a Acuidar.",
        "Marcel, fica a frente da empresa e foi totalmente cuidadoso, respeitoso e atencioso com nossa situação.",
        "Enfermeira Danielle, em pleno feriado visitou e pontuou tudo tão claramente, foi mais do que tudo HUMANA.",
        "E por fim enviaram uma cuidadora maravilhosa, respeitosa e de um profissionalismo desigual.",
        "Gratidão por tudo, indico a Acuidar de olhos fechados, pois tenho plena certeza que qualquer pessoa será bem cuidada, assistida e AMADA.",
      ],
    },
    {
      image: "/google_review_vivian.png",
      name: "Vivian Caetano Alcantara",
      text: [
        "O atendimento, organização, contratação e todo suporte da Acuidar Jardins foi impecável comigo e minha mãe, que esteve internada.",
        "Sempre nos atenderam com extremo cuidado, respondendo todas as dúvidas e, principalmente, nos apoiando em todo momento com minha mãe e em toda situação hospitalar.",
        "Indiquei a Acuidar Jardins dentro do próprio hospital (Beneficência Portuguesa) e continuarei indicando a todas pessoas que precisarem deste tipo de apoio.",
        "Muito obrigada, Marcel, Emmanuel, Danielle e toda equipe Acuidar!",
        "Serei eternamente grata por tudo 🙏🏻",
      ],
    },
    {
      image: "/google_review_jacqueline.png",
      name: "Jacqueline Stefanelli",
      text: [
        "Contratei os serviços da Acuidar Jardins para minha mãe que precisou ser hospitalizada e fui super bem atendida pelo Marcel, enfermeira Dani e a cuidadora Rose que foi muito querida e carinhosa comigo e com a minha mãe.",
        "O atendimento foi super rápido, organizado, simplesmente impecável em cada detalhe.",
        "Eu só posso recomendar mil vezes.",
      ],
    },
    {
      image: "/google_review_rodrigo.png",
      name: "Rodrigo Ibanez",
      text: [
        "Só tenho que agradecer o atendimento prestado.",
        "Tive problemas em família, momento de grande dificuldade, e a empresa prestou o atendimento com qualidade e eficiência.",
        "O responsável pelo atendimento tomou todos os cuidados para que o trabalho fosse prestado de modo a amenizar o desgaste familiar, sendo que isso foi de grande relevância e importância.",
        "A quem possa interessar, recomendo os serviços desta empresa.",
      ],
    },
    {
      image: "/google_review_maria.png",
      name: "Maria Regina Branco",
      text: [
        "Minha mãe precisou de uma cuidadora para acompanha-la por 24 horas para um exame de colonoscopia.",
        "Contatamos a empresa em última hora e prontamente nos ajudaram alocando uma cuidadora técnica de enfermagem muito atenciosa e amorosa.",
        "A comunicação com a cuidadora e com a enfermeira responsável foi muito rápida e nos atualizaram a todo momento dos procedimentos.",
        "Gostei muito da experiência.",
      ],
    },
    {
      image: "/google_review_juliana.png",
      name: "Juliana Higuchi",
      text: [
        "Minha família contratou os serviços de plantão de cuidador hospitalar e fomos extremamente bem atendidos pela equipe da Acuidar Jardins.",
        "Nos responderam imediatamente, já encaminhando um contrato de prestação de serviços, com todos os termos bem delimitados.",
        "As cuidadoras Valéria e Andreza são excelentes, tiveram muita atenção e cuidado com uma paciente idosa, que necessitava de cuidados especiais.",
        "Estamos muito satisfeitos e temos apenas elogios à empresa!",
      ],
    },
    {
      image: "/google_review_alexandro.png",
      name: "Alexsandro Carvalho",
      text: [
        "Contratei o serviço da Acuidar para cuidar de meu pai por 15 dias enquanto viajávamos para trabalhar fora de São Paulo.",
        "Nesse período, fiquei bastante satisfeito com o tratamento e zelo que recebemos por toda equipe administrativa e, principalmente, do cuidador Marcos.",
        "Parabéns pelo serviço de excelência que foi prestado.",
      ],
    },
    {
      image: "/google_review_dete.png",
      name: "Dete Campos",
      text: [
        "Profissionais  capacitados e comprometidos.",
        "A agência  Acuidar tem um serviço de excelência e de qualidade.",
        "A preocupação deles,  com os assistidos, é legítima e genuína.",
        "Só posso elogiar!",
      ],
    },
    {
      image: "/google_review_lilian.png",
      name: "Lilian Botelho",
      text: [
        "Excelente atendimento!!",
        "Profissionais dedicados e atenciosos, nesse momento que precisamos de toda delicadeza e humanidade possível!!",
        "Obrigada a todos os profissionais envolvidos no atendimento.",
      ],
    },
    {
      image: "/google_review_cristina.png",
      name: "Cristina",
      text: [
        "Sensacional.",
        "Profissionalismo, rápido atendimento, a Cuidadora Flávia é muito cuidadosa, atenciosa e carinhosa.",
        "Possuem enfermeira de acompanhamento e a gestão é de livre e fácil acesso.",
      ],
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
      <Button width="15rem" background="#063e24e1" backgroundHover="#063e24bd">
        <div className={styles.button_content}>Faça um orçamento</div>
      </Button>
    </section>
  );
};

type CarouselItemProps = { image: string; name: string; text: string[] };

const CarouselItem = ({ image, name, text }: CarouselItemProps) => (
  <div className={styles.carousel_item}>
    <Image alt={name} src={image} height={60} width={60} />
    <p className={styles.carousel_name}>{name}</p>
    <Image
      alt="Avaliação 5 estrelas Google"
      src="/five_stars.png"
      height={30}
      width={118}
    />
    {Children.toArray(
      text.map((content) => <p className={styles.carousel_text}>{content}</p>)
    )}
  </div>
);

export default GoogleReviewsSection;
