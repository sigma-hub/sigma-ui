import { expect, it } from 'vitest';
import { transform } from '../../src/utils/transformers';

it('transform import', async () => {
  expect(
    await transform({
      filename: 'app.vue',
      raw: `import { Foo } from "bar"
    import { Button } from "@/lib/registry/tailwind/ui/button"
    import { Label} from "ui/label"
    import { Box } from "@/lib/registry/tailwind/box"

    import { cn } from "@/lib/utils"
    `,
      config: {
        baseColor: 'zinc',
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      },
    }),
  ).toMatchSnapshot();

  expect(
    await transform({
      filename: 'app.vue',
      raw: `import { Foo } from "bar"
      import { Button } from "@/lib/registry/tailwind/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/lib/registry/tailwind/box"

      import { cn, foo, bar } from "@/lib/utils"
      import { bar } from "@/lib/utils/bar"
      `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/lib',
        },
      },
    }),
  ).toMatchSnapshot();

  expect(
    await transform({
      filename: 'app.vue',
      raw: `import { Foo } from "bar"
      import { Button } from "@/lib/registry/tailwind/ui/button"
      import { Label} from "ui/label"
      import { Box } from "@/lib/registry/tailwind/box"

    import { cn } from "@/lib/utils"
    import { bar } from "@/lib/utils/bar"
    `,
      config: {
        aliases: {
          components: '~/src/components',
          utils: '~/src/utils',
        },
      },
    }),
  ).toMatchSnapshot();
});
