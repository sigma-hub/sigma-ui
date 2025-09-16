export const CSS_STYLES_WITH_VARS_TEMPLATE = `@layer base {
  /* Override preflight default hover cursor for buttons and button-like elements */
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }

  :root {
    --radius: <%- sizes.radius %>rem;
    --radius-full: 9999px;
    --radius-xl: calc(var(--radius) + 4px);
    --radius-lg: var(--radius);
    --radius-md: calc(var(--radius) - 2px);
    --radius-sm: calc(var(--radius) - 4px);
    --radius-xs: min(calc(var(--radius) / 2.5), 6px);
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --shadow-md: 
      0 4px 6px -1px rgba(0, 0, 0, 0.02), 
      0 2px 4px -1px rgba(0, 0, 0, 0.02),
      0 12px 24px rgba(0, 0, 0, 0.05);
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
    border-color: hsl(var(--border));
  }
    
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes collapsible-down {
    from {
      height: 0;
    }
    to {
      height: var(--reka-collapsible-content-height);
    }
  }

  @keyframes collapsible-up {
    from {
      height: var(--reka-collapsible-content-height);
    }
    to {
      height: 0;
    }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease;
  }

  .animate-spin {
    animation: spin 1s linear infinite;
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
