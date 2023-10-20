import { type IContext } from "@digger/ui"

export interface SiteContext extends IContext {
  showPlayground: boolean
  playgroundURL: string
}