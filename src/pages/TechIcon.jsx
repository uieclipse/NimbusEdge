import ReactIcon from '../assets/icons/react.svg?react';
import JavaScriptIcon from '../assets/icons/javascript.svg?react';
import Html5Icon from '../assets/icons/html5.svg?react';
import Css3Icon from '../assets/icons/css3.svg?react';
import TypeScriptIcon from '../assets/icons/typescript.svg?react';
import ReduxIcon from '../assets/icons/redux.svg?react';
import GitIcon from '../assets/icons/git.svg?react';
import GitHubIcon from '../assets/icons/github.svg?react';
import FigmaIcon from '../assets/icons/figma.svg?react';
import JestIcon from '../assets/icons/jest.svg?react';
import TailwindIcon from '../assets/icons/tailwindcss.svg?react';
import ViteIcon from '../assets/icons/vitejs.svg?react';
import SassIcon from '../assets/icons/sass.svg?react';
import WebpackIcon from '../assets/icons/webpack.svg?react';

export const ICONS = {
  react: ReactIcon,
  javascript: JavaScriptIcon,
  html5: Html5Icon,
  css3: Css3Icon,
  typescript: TypeScriptIcon,
  redux: ReduxIcon,
  git: GitIcon,
  github: GitHubIcon,
  figma: FigmaIcon,
  jest: JestIcon,
  tailwindcss: TailwindIcon,
  vite: ViteIcon,
  sass: SassIcon,
  webpack: WebpackIcon,
};

export default function TechIcon({ name, className }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
