import type { InjectionKey, Ref } from "vue";
import type { ArticleSource } from "@/types/article";

/** Provided by ArticleView so ArticleCite can show each source inline. */
export const articleSourcesKey: InjectionKey<Readonly<Ref<ArticleSource[]>>> =
  Symbol("articleSources");
