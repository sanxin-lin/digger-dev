import { type PropType, type Component, type Plugin, type App } from 'vue';
import { isArray } from 'lodash-es';
import { bigCamelize } from '@digger/shared';

export type ComponentWithInstall<T> = T & Plugin;
export type ClassName = string | undefined | null;
export type Classes = (ClassName | [any, ClassName, ClassName?])[];
export type BEM<
  S extends string | undefined,
  N extends string,
  NC extends string,
> = S extends undefined
  ? NC
  : S extends `$--${infer CM}`
  ? `${N}--${CM}`
  : S extends `--${infer M}`
  ? `${NC}--${M}`
  : `${NC}__${S}`;

export const defineListenerProp = <F>(fallback?: any) => {
  return {
    type: [Function, Array] as PropType<F | F[]>,
    default: fallback,
  };
};

export const withInstall = <T = Component>(
  component: Component,
  target?: T,
): ComponentWithInstall<T> => {
  const componentWithInstall = target ?? component;

  (componentWithInstall as ComponentWithInstall<T>).install = function (app: App) {
    const { name } = component;

    if (name) {
      app.component(name, component);
    }
  };

  return componentWithInstall as ComponentWithInstall<T>;
};

export function createNamespace<C extends string>(name: C) {
  const namespace = `var` as const;
  const componentName = `${namespace}-${name}` as const;

  const createBEM = <S extends string | undefined = undefined>(
    suffix?: S,
  ): BEM<S, typeof namespace, typeof componentName> => {
    if (!suffix) {
      return componentName as any;
    }

    if (suffix[0] === '$') {
      return suffix.replace('$', namespace) as any;
    }

    return (
      suffix.startsWith('--') ? `${componentName}${suffix}` : `${componentName}__${suffix}`
    ) as any;
  };

  const classes = (...classes: Classes): any[] =>
    classes.map(className => {
      if (isArray(className)) {
        const [condition, truthy, falsy = null] = className;
        return condition ? truthy : falsy;
      }

      return className;
    });

  return {
    name: bigCamelize(componentName),
    n: createBEM,
    classes,
  };
}

export function call<P extends any[], R>(
  fn?: ((...arg: P) => R) | ((...arg: P) => R)[] | null,
  ...args: P
): R | R[] | undefined {
  if (isArray(fn)) {
    return fn.map(f => f(...args));
  }

  if (fn) {
    return fn(...args);
  }
}

export function pickProps<T, U extends keyof T>(props: T, propsKey: U): T[U];
export function pickProps<T, U extends keyof T>(props: T, propsKey: U[]): Pick<T, U>;
export function pickProps(props: any, propsKey: any): any {
  return isArray(propsKey)
    ? propsKey.reduce((pickedProps: any, key) => {
        pickedProps[key] = props[key];
        return pickedProps;
      }, {})
    : props[propsKey];
}
