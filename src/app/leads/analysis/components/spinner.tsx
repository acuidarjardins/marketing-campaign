import styles from "./spinner.module.css";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
};

const sizeMap = { sm: "20px", md: "32px", lg: "48px" };

const Spinner = ({ size = "md" }: SpinnerProps) => (
  <div
    className={styles.spinner}
    style={{ "--spinner-size": sizeMap[size] } as React.CSSProperties}
  />
);

export default Spinner;
