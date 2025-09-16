export const TAILWIND_STYLES_TEMPLATE = `@import "tailwindcss";
@config "../../tailwind.config.js";`;

export const TAILWIND_STYLES_WITH_VARS_TEMPLATE = `@import "tailwindcss";
@config "../../tailwind.config.js";

@layer base {
  /* Override Tailwind 4 default hover cursor for buttons and button-like elements */
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }

  :root {
    --radius: <%- sizes.radius %>rem;
  }
 
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --ring: <%- colors.light["ring"] %>;
  }
 
  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --ring: <%- colors.dark["ring"] %>;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }

  .fade-slide-top-enter-active,
  .fade-slide-top-leave-active {
    transition: all 0.3s ease;
  }

  .fade-slide-top-enter-from,
  .fade-slide-top-leave-to {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(8px);
  }
}`;
