---
title: Theming
description: Use CSS Variables to customize the look and feel of your application.
---

### Variables

If you setup `SIGMA-UI` to use CSS Variables, they will be added to your index css file during [initialization](/docs/cli.html).

Below is the list of all variables used in the `SIGMA-UI` components. You can customize them and add your own:

<Steps>

Primary background and text colors
```
--background: 0 0% 100%;
--foreground: 222.2 47.4% 11.2%;
```

Muted backgrounds in components like `<TabsList />`, `<Skeleton />`, and `<Switch />`
```
--muted: 210 40% 96.1%;
--muted-foreground: 215.4 16.3% 46.9%;
```

Background color for `<Card />`
```
--card: 0 0% 100%;
--card-foreground: 222.2 47.4% 11.2%;
```

Background color in popover components like `<DropdownMenu />`, `<HoverCard />`, and `<Popover />`
```
--popover: 0 0% 100%;
--popover-foreground: 222.2 47.4% 11.2%;
```

Border color
```
--border: 214.3 31.8% 91.4%;
```

Border color for inputs like `<Input />`, `<Select />`, and `<Textarea />`
```
--input: 214.3 31.8% 91.4%;
```

Primary colors for components like `<Button />`, `<Slider />`, and `<Calendar />`
```
--primary: 222.2 47.4% 11.2%;
--primary-foreground: 210 40% 98%;
```

Secondary colors for components like `<Button />`, `<Slider />`, and `<Calendar />`
```
--secondary: 210 40% 96.1%;
--secondary-foreground: 222.2 47.4% 11.2%;
```

Used for accents such as hover effects on `<DropdownMenuItem />`, `<SelectItem />`, etc
```
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

Used for destructive actions such as `<Button variant="destructive">`
```
--destructive: 0 100% 50%;
--destructive-foreground: 210 40% 98%;
```

Used for focus ring
```
--ring: 215 20.2% 65.1%;
```

Border radius for card, input and buttons
```
--radius: 0.5rem;
```
</Steps>

### Color format

The variable values are written in [HSL format](https://www.smashingmagazine.com/2021/07/hsl-colors-css/) (without color space function and commas between values). I recommend using this HSL color format for theming since it allows for easy alpha channel customization, like:

```html
<div class="bg-foreground/50" >
  Text with 50% opacity
</div>
```

See the [Tailwind CSS documentation](https://tailwindcss.com/docs/customizing-colors#using-css-variables) for more information on using `rgb`, `rgba` or `hsl` colors.

### Adding new variables

To add new variables, you need to add them to your CSS file and to your `tailwind.config.js` file (if you use Tailwind).

```css title="app/globals.css"
:root {
  --warning: 38 92% 50%;
  --warning-foreground: 48 96% 89%;
}

.dark {
  --warning: 48 96% 89%;
  --warning-foreground: 38 92% 50%;
}
```

```js {5-6} title="tailwind.config.js"
module.exports = {
  theme: {
    extend: {
      colors: {
        'warning': 'hsl(var(--warning))',
        'warning-foreground': 'hsl(var(--warning-foreground))',
      },
    },
  },
}
```

After that, you can use this `warning` utility class in your components:

```html /bg-warning/ /text-warning-foreground/
<div class="bg-warning text-warning-foreground" />
```
