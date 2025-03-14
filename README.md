<!-- Intoduction Folder Structure -->
1. /app: Main workspace with routes, components, and logic.
2. /app/lib: Utility and data-fetching functions.
3. /app/ui: Pre-styled UI components (cards, tables, forms).
4. /public: Static assets (images, etc.).
5. Config Files: Pre-configured files (e.g., next.config.ts), no need to modify.

<!-- <Image> Component: Enhanced <img> with optimization. -->
1. Prevents Layout Shift: Images load smoothly.
2. Auto-Resizing: Avoids large images on small screens.
3. Lazy Loading: Loads images only when needed.
4. Modern Formats: Supports WebP & AVIF for better performance.

<!-- page.tsx is a special Next.js file that exports a React component, and it's required for the route to be accessible. In your application, you already have a page file: /app/page.tsx - this is the home page associated with the route /. -->

<!-- <Link />: Enables client-side navigation in Next.js. -->

<!-- Next.js provides a hook called usePathname() that you can use to check the path and implement this pattern. -->

<!-- seeding in the context of databases:
Populating the database with an initial set of data -->

<!-- 
SQL is the industry standard for querying relational databases (e.g. ORMs generate SQL under the hood). 

SQL is versatile, allowing you to fetch and manipulate specific data.

The postgres.js library provides protection against SQL injections.
-->

<!-- 
There are two ways you implement streaming in Next.js:
    1. At the page level, with the loading.tsx file (which creates <Suspense> for you).
    2. At the component level, with <Suspense> for more granular control.

loading.tsx is a special Next.js file built on top of React Suspense. It allows you to create fallback UI to show as a replacement while page content loads.
 
-->