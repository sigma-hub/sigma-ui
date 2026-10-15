export const CSS_STYLES_WITH_VARS_TEMPLATE = `@layer base {
  /* Override preflight default hover cursor for buttons and button-like elements */
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
    
  :root {
    --backdrop-filter-blur: <%- sizes.backdropFilterBlur %>px;
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
      
<% Object.entries(colors.light).forEach(function (entry) { %>
    --<%= entry[0] %>: <%= entry[1] %>;
<% }) %>
  }
 
  .dark {
<% Object.entries(colors.dark).forEach(function (entry) { %>
    --<%= entry[0] %>: <%= entry[1] %>;
<% }) %>
  }

  * {
    border-color: var(--border);
  }
    
  body {
    background-color: var(--background);
    color: var(--foreground);
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
  
  /* Shared keyframes */
  @keyframes sigma-ui-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes sigma-ui-fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes sigma-ui-fade-in-scale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes sigma-ui-fade-out-scale {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @keyframes sigma-ui-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes sigma-ui-collapsible-down {
    from {
      height: 0;
    }
    to {
      height: var(--reka-collapsible-content-height);
    }
  }

  @keyframes sigma-ui-collapsible-up {
    from {
      height: var(--reka-collapsible-content-height);
    }
    to {
      height: 0;
    }
  }

  @keyframes sigma-ui-accordion-up {
    from {
      height: var(--reka-accordion-content-height);
    }
    to {
      height: 0;
    }
  }

  @keyframes sigma-ui-accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(--reka-accordion-content-height);
    }
  }
    
  /* CSS animations */
  .animate-fade-in {
    animation: sigma-ui-fade-in 0.5s ease;
  }

  .animate-sigma-ui-spin {
    animation: sigma-ui-spin 1s linear infinite;
  }

  /* Vue transitions */
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
