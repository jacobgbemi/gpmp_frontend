import { LoginForm } from "../components/LoginForm";

export function LoginPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          GlintPM Private
        </span>
        <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your project portfolio.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
