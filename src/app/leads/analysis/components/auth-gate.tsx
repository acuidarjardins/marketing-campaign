import { useState } from "react";
import Spinner from "./spinner";
import styles from "./auth-gate.module.css";

type AuthGateProps = {
  onSubmit: (password: string) => void;
  error: string;
  loading: boolean;
};

const AuthGate = ({ onSubmit, error, loading }: AuthGateProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <Spinner size="lg" />
          <p className={styles.loading_text}>Verificando acesso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.icon_wrapper}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#132e33" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className={styles.title}>Acesso Restrito</h1>
        <p className={styles.subtitle}>
          Insira a senha para acessar a análise de leads.
        </p>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="password"
          className={styles.input}
          placeholder="Senha"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AuthGate;
