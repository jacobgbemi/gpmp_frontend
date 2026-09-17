import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";

export function TopNav() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <MobileNav />
        <span className="text-sm font-medium text-muted-foreground lg:hidden">
          GlintPM Private
        </span>
      </div>
      <UserMenu />
    </header>
  );
}
