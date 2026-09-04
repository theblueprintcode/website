// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"architecture.mdx": () => import("../content/docs/architecture.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "engine/auth-policy.mdx": () => import("../content/docs/engine/auth-policy.mdx?collection=docs"), "engine/contributing.mdx": () => import("../content/docs/engine/contributing.mdx?collection=docs"), "engine/index.mdx": () => import("../content/docs/engine/index.mdx?collection=docs"), "engine/rbac.mdx": () => import("../content/docs/engine/rbac.mdx?collection=docs"), "engine/setup.mdx": () => import("../content/docs/engine/setup.mdx?collection=docs"), "ui-frame/generators.mdx": () => import("../content/docs/ui-frame/generators.mdx?collection=docs"), "ui-frame/index.mdx": () => import("../content/docs/ui-frame/index.mdx?collection=docs"), "ui-frame/multi-tenancy.mdx": () => import("../content/docs/ui-frame/multi-tenancy.mdx?collection=docs"), "ui-frame/setup.mdx": () => import("../content/docs/ui-frame/setup.mdx?collection=docs"), }),
};
export default browserCollections;