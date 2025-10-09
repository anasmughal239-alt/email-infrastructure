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
  ): ((props: P & { ref?: React.Ref<T> }) => React.ReactElement | null) & { displayName?: string };
  
  // Essential React hooks and functions
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
  export type ReactNode = any;
  export type ComponentType<P = {}> = (props: P) => React.ReactElement | null;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useRef<T>(initialValue: T): { current: T };
  export function useContext<T>(context: any): T;
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
  export function useSearchParams(): URLSearchParams;
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
  } & ((component: any) => ComponentType<MotionProps>);
  
  export const AnimatePresence: ComponentType<{
    children: ReactNode;
    exitBeforeEnter?: boolean;
    initial?: boolean;
    onExitComplete?: () => void;
    mode?: string;
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
  export const FiAlertCircle: ComponentType<IconProps>;
  export const FiEye: ComponentType<IconProps>;
  export const FiEyeOff: ComponentType<IconProps>;
  export const FiLock: ComponentType<IconProps>;
  export const FiUser: ComponentType<IconProps>;
  export const FiPhone: ComponentType<IconProps>;
  export const FiMapPin: ComponentType<IconProps>;
  export const FiClock: ComponentType<IconProps>;
  export const FiMessageSquare: ComponentType<IconProps>;
  export const FiHeadphones: ComponentType<IconProps>;
  export const FiSend: ComponentType<IconProps>;
  export const FiFileText: ComponentType<IconProps>;
  export const FiLink: ComponentType<IconProps>;
  export const FiShield: ComponentType<IconProps>;
  export const FiZap: ComponentType<IconProps>;
  export const FiCheckCircle: ComponentType<IconProps>;
  export const FiPlay: ComponentType<IconProps>;
  export const FiAlertTriangle: ComponentType<IconProps>;
  export const FiChevronDown: ComponentType<IconProps>;
  export const FiChevronUp: ComponentType<IconProps>;
  export const FiCreditCard: ComponentType<IconProps>;
  export const FiMoreVertical: ComponentType<IconProps>;
  export const FiPlus: ComponentType<IconProps>;
  export const FiLogOut: ComponentType<IconProps>;
  export const FiBell: ComponentType<IconProps>;
  export const FiCode: ComponentType<IconProps>;
  export const FiKey: ComponentType<IconProps>;
  export const FiCopy: ComponentType<IconProps>;
  export const FiExternalLink: ComponentType<IconProps>;
  export const FiBook: ComponentType<IconProps>;
  export const FiEdit: ComponentType<IconProps>;
  export const FiTrash2: ComponentType<IconProps>;
  export const FiDownload: ComponentType<IconProps>;
  export const FiInfo: ComponentType<IconProps>;
  export const FiDatabase: ComponentType<IconProps>;
  export const FiRefreshCw: ComponentType<IconProps>;
  export const FiHelpCircle: ComponentType<IconProps>;
  export const FiFlag: ComponentType<IconProps>;
  export const FiServer: ComponentType<IconProps>;
  export const FiCloud: ComponentType<IconProps>;
  export const FiShoppingCart: ComponentType<IconProps>;
  export const FiGithub: ComponentType<IconProps>;
  export const FiUserCheck: ComponentType<IconProps>;
  export const FiHeart: ComponentType<IconProps>;
  export const FiAward: ComponentType<IconProps>;
  export const FiMonitor: ComponentType<IconProps>;
  export const FiWifi: ComponentType<IconProps>;
  export const FiHome: ComponentType<IconProps>;
  export const FiPieChart: ComponentType<IconProps>;
  export const FiSettings: ComponentType<IconProps>;
  export const FiUsers: ComponentType<IconProps>;
  export const FiMail2: ComponentType<IconProps>;
  export const FiArrowUp: ComponentType<IconProps>;
  export const FiArrowDown: ComponentType<IconProps>;
  export const FiArrowLeft: ComponentType<IconProps>;
  export const FiArrowRight: ComponentType<IconProps>;
  export const FiChevronLeft: ComponentType<IconProps>;
  export const FiChevronRight: ComponentType<IconProps>;
}

declare module 'react-icons/fc' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    size?: string | number;
    color?: string;
    className?: string;
    [key: string]: any;
  }
  
  export const FcGoogle: ComponentType<IconProps>;
}

declare module 'react-icons/fa' {
  import { ComponentType } from 'react';
  
  interface IconProps {
    size?: string | number;
    color?: string;
    className?: string;
    [key: string]: any;
  }
  
  export const FaGithub: ComponentType<IconProps>;
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
