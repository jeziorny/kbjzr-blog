import { FormEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type ThemePreference = "light" | "dark";

interface BlogHeaderProps {
  /** The ConvertKit form is retained, but the new home view keeps it out of sight. */
  showNewsletter?: boolean;
}

export const BlogHeader = ({ showNewsletter = false }: BlogHeaderProps) => {
  const location = useLocation();
  const [theme, setTheme] = useState<ThemePreference>(() => {
    return window.localStorage.getItem("kbjzr-theme") === "dark" ? "dark" : "light";
  });
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("kbjzr-theme", theme);
  }, [theme]);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const convertKitForm = document.createElement("form");
    convertKitForm.action = "https://app.convertkit.com/forms/7968392/subscriptions";
    convertKitForm.method = "post";
    convertKitForm.target = "_blank";

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.name = "email_address";
    emailInput.value = email;

    convertKitForm.appendChild(emailInput);
    document.body.appendChild(convertKitForm);
    convertKitForm.submit();
    document.body.removeChild(convertKitForm);
    setEmail("");
  };

  return (
    <header className="site-header">
      <div className="site-frame">
        <aside className="site-sidebar" aria-label="Główna nawigacja">
          <Link className="site-title" to="/">KBJZR</Link>
          <nav className="site-navigation">
            <Link aria-current={location.pathname === "/" ? "page" : undefined} to="/">Wpisy</Link>
            <Link aria-current={location.pathname === "/about.html" ? "page" : undefined} to="/about.html">O mnie</Link>
          </nav>
        </aside>
      </div>

      <div className="appearance-switch" aria-label="Motyw strony">
        {(["light", "dark"] as ThemePreference[]).map((option) => (
          <button
            aria-label={option === "light" ? "Jasny motyw" : "Ciemny motyw"}
            aria-pressed={theme === option}
            className={theme === option ? "is-active" : undefined}
            key={option}
            onClick={() => setTheme(option)}
            type="button"
          />
        ))}
      </div>

      {showNewsletter && (
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <label htmlFor="newsletter-email">Wpisy na maila</label>
          <div>
            <input
              id="newsletter-email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="adres@email.pl"
              required
              type="email"
              value={email}
            />
            <button type="submit">Zapisz się</button>
          </div>
        </form>
      )}
    </header>
  );
};
