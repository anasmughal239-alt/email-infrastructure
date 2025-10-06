// Type declarations for missing modules

declare module 'next' {
  export interface Metadata {
    title: string;
    description: string;
    [key: string]: any;
  }
}

declare module 'next/font/google' {
  export function Inter(options: any): {
    className: string;
    style: { fontFamily: string };
    variable: string;
  };
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    [key: string]: any;
  }
  
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    [key: string]: any;
  }
  
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    [key: string]: any;
  }
  
  export function forwardRef<T, P>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & { ref?: React.Ref<T> }) => React.ReactElement | null;
}

declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react';
  
  interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    className?: string;
    children: ReactNode;
    [key: string]: any;
  }
  
  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/navigation' {
  export function usePathname(): string;
  export function useRouter(): {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
  };
}

declare module 'framer-motion' {
  import { ComponentType, ReactNode } from 'react';
  
  interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    className?: string;
    children?: ReactNode;
    [key: string]: any;
  }
  
  export const motion: {
    div: ComponentType<MotionProps>;
    nav: ComponentType<MotionProps>;
    ul: ComponentType<MotionProps>;
    li: ComponentType<MotionProps>;
    button: ComponentType<MotionProps>;
    a: ComponentType<MotionProps>;
    [key: string]: ComponentType<MotionProps>;
  };
  
  export const AnimatePresence: ComponentType<{
    children: ReactNode;
    exitBeforeEnter?: boolean;
    initial?: boolean;
    onExitComplete?: () => void;
  }>;
}

declare module 'react-icons/fi' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    size?: string | number;
    color?: string;
    className?: string;
    [key: string]: any;
  }
  
  export const FiMenu: ComponentType<IconProps>;
  export const FiX: ComponentType<IconProps>;
  export const FiSun: ComponentType<IconProps>;
  export const FiMoon: ComponentType<IconProps>;
  export const FiTwitter: ComponentType<IconProps>;
  export const FiGithub: ComponentType<IconProps>;
  export const FiLinkedin: ComponentType<IconProps>;
  export const FiMail: ComponentType<IconProps>;
  export const FiCheck: ComponentType<IconProps>;
  export const FiHome: ComponentType<IconProps>;
  export const FiPieChart: ComponentType<IconProps>;
  export const FiSettings: ComponentType<IconProps>;
  export const FiUsers: ComponentType<IconProps>;
  export const FiBarChart2: ComponentType<IconProps>;
  export const FiArrowUp: ComponentType<IconProps>;
  export const FiArrowDown: ComponentType<IconProps>;
  export const FiChevronLeft: ComponentType<IconProps>;
  export const FiChevronRight: ComponentType<IconProps>;
}

declare module 'next-themes' {
  import { ComponentType, ReactNode } from 'react';
  
  export function useTheme(): {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    resolvedTheme: string | undefined;
    themes: string[];
  };
  
  export const ThemeProvider: ComponentType<{
    children: ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    [key: string]: any;
  }>;
}

declare module 'next-themes/dist/types' {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: string;
    enableSystem?: boolean;
    [key: string]: any;
  }
}

declare module 'class-variance-authority' {
  export function cva(base: string, config: any): any;
  export type VariantProps<T> = any;
}

// Add React namespace for JSX
declare namespace React {
  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
  
  type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;
  
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
  }
  
  interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
    new(props: P, context?: any): Component<P, S>;
    displayName?: string;
  }
  
  type ComponentState = any;
  
  interface Component<P = {}, S = {}> {
    render(): ReactNode;
    props: Readonly<P>;
    state: Readonly<S>;
    context: any;
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
  }
  
  interface StaticLifecycle<P, S> {
  }
  
  type Key = string | number;
  
  type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  
  type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
  
  interface ReactFragment {}
  
  interface ReactPortal extends ReactElement {
    key: Key | null;
    children: ReactNode;
  }
  
  // Add missing HTML attribute interfaces
  interface HTMLAttributes<T> {
    className?: string;
    id?: string;
    style?: any;
    [key: string]: any;
  }
  
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    [key: string]: any;
  }
  
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
    name?: string;
    value?: any;
    placeholder?: string;
    disabled?: boolean;
    [key: string]: any;
  }
  
  // Add forwardRef type
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
  
  type ForwardRefExoticComponent<P> = {
    (props: P): ReactElement | null;
    displayName?: string;
  };
  
  type PropsWithoutRef<P> = P;
  
  interface RefAttributes<T> {
    ref?: Ref<T>;
  }
  
  type Ref<T> = ((instance: T | null) => void) | RefObject<T> | null;
  
  interface RefObject<T> {
    readonly current: T | null;
  }
}

// Add JSX namespace
declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
  
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  
  interface ElementAttributesProperty {
    props: {};
  }
  
  interface ElementChildrenAttribute {
    children: {};
  }
  
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}