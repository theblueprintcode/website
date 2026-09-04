import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { source } from "@/lib/source";

/**
 * Docs shell. The site nav and footer stay in the root layout, so this only
 * supplies the sidebar tree and fumadocs' own providers.
 */
export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <RootProvider
      theme={{ enabled: false }}
      search={{ options: { type: "static" } }}
    >
      <DocsLayout
        tree={source.pageTree}
        nav={{ enabled: false }}
        sidebar={{ collapsible: false }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
