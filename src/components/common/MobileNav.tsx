import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { NavList } from "./NavList";

/**
 * Off-canvas navigation drawer for small screens, triggered from the
 * hamburger icon in TopNav.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 lg:hidden" />
        <DialogPrimitive.Content
          className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-background shadow-lg lg:hidden"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title asChild>
            <div className="flex h-16 items-center border-b border-border px-6">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-primary"
              >
                GlintPM <span className="text-foreground">Private</span>
              </Link>
            </div>
          </DialogPrimitive.Title>
          <NavList onNavigate={() => setOpen(false)} />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
