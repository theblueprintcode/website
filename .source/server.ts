// @ts-nocheck
import * as __fd_glob_13 from "../content/docs/ui-frame/setup.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/ui-frame/multi-tenancy.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/ui-frame/index.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/ui-frame/generators.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/engine/setup.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/engine/rbac.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/engine/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/engine/contributing.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/engine/auth-policy.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/architecture.mdx?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/ui-frame/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/engine/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "engine/meta.json": __fd_glob_1, "ui-frame/meta.json": __fd_glob_2, }, {"architecture.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, "engine/auth-policy.mdx": __fd_glob_5, "engine/contributing.mdx": __fd_glob_6, "engine/index.mdx": __fd_glob_7, "engine/rbac.mdx": __fd_glob_8, "engine/setup.mdx": __fd_glob_9, "ui-frame/generators.mdx": __fd_glob_10, "ui-frame/index.mdx": __fd_glob_11, "ui-frame/multi-tenancy.mdx": __fd_glob_12, "ui-frame/setup.mdx": __fd_glob_13, });