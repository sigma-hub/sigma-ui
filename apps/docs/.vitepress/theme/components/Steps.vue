<template>
  <div
    class="[counter-reset:step] mb-12 ml-4 border-l pl-8 [&>h3]:[counter-increment:step] [&>h3]:relative [&>h3:before]:content-[counter(step)] [&>h3:before]:absolute [&>h3:before]:flex [&>h3:before]:items-center [&>h3:before]:justify-center [&>h3:before]:w-[40px] [&>h3:before]:h-[40px] [&>h3:before]:-top-[6px] [&>h3:before]:-left-[52px] [&>h3:before]:text-md [&>h3:before]:text-white [&>h3:before]:bg-muted [&>h3:before]:rounded-xl [&>h3:before]:p-2"
  >
    <slot />
  </div>
</template>
