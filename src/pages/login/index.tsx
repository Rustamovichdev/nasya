
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

type UserRole = "admin" | "manager" | "cashier";

interface User {
  id: number;
  name: string;
  username: string;
  role: UserRole;
}

const users: (User & { password: string })[] = [
  {
    id: 1,
    name: "Admin",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Manager",
    username: "manager",
    password: "manager123",
    role: "manager",
  },
  {
    id: 3,
    name: "Cashier",
    username: "cashier",
    password: "cashier123",
    role: "cashier",
  },
];

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Login va parolni kiriting!");
      return;
    }

    setLoading(true);

    const foundUser = users.find(
      (user) =>
        user.username === username.trim() &&
        user.password === password
    );

    if (!foundUser) {
      setError("Login yoki parol noto'g'ri!");
      setLoading(false);
      return;
    }

    const { password: _, ...userData } = foundUser;

    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/dashboard", { replace: true });
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">

        <div className="login-left">
          <div className="brand">
            <div className="brand-icon">Q</div>
            <span>QarzDaftar</span>
          </div>

          <div className="welcome-content">
            <span className="welcome-label">
              BUSINESS MANAGEMENT SYSTEM
            </span>

            <h1>
              Biznesingizni
              <br />
              <span>oson boshqaring.</span>
            </h1>

            <p>
              Barcha qarzlar, mijozlar va moliyaviy
              operatsiyalarni bitta platformada boshqaring.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span>✓</span>
                Qarzlarni nazorat qilish
              </div>

              <div className="feature-item">
                <span>✓</span>
                Mijozlarni boshqarish
              </div>

              <div className="feature-item">
                <span>✓</span>
                Kirim va chiqim hisoboti
              </div>
            </div>
          </div>

          <div className="login-footer">
            © 2026 QarzDaftar. Barcha huquqlar himoyalangan.
          </div>
        </div>

        <div className="login-right">
          <div className="login-form-wrapper">

            <div className="mobile-brand">
              <div className="brand-icon">Q</div>
              <span>QarzDaftar</span>
            </div>

            <div className="form-heading">
              <h2>Xush kelibsiz!</h2>
              <p>Hisobingizga kirish uchun ma'lumotlarni kiriting.</p>
            </div>

            <form onSubmit={handleLogin}>

              <div className="form-group">
                <label htmlFor="username">Login</label>

                <div className="input-wrapper">
                  <span className="input-icon">♙</span>

                  <input
                    id="username"
                    type="text"
                    placeholder="Loginni kiriting"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Parol</label>

                <div className="input-wrapper">
                  <span className="input-icon">♙</span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolni kiriting"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Yashirish" : "Ko'rish"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? "Kutilmoqda..." : "Tizimga kirish"}
                <span>→</span>
              </button>

            </form>

            <div className="demo-accounts">
              <p>Demo hisoblar:</p>

              <div>
                <span>Admin</span>
                <code>admin / admin123</code>
              </div>

              <div>
                <span>Manager</span>
                <code>manager / manager123</code>
              </div>

              <div>
                <span>Cashier</span>
                <code>cashier / cashier123</code>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
