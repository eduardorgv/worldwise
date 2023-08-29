import { PageNav } from "../../components";
import { useAuth } from "../../contexts/FakeAuthContext";
import { useEffect, useState } from "react";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";

export const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated])

  return (
    <main className={styles.login} onSubmit={handleSubmit}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
};
