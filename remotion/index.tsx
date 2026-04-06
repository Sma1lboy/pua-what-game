import { registerRoot, Composition } from 'remotion';
import { Logo } from './Logo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Logo"
        component={Logo}
        durationInFrames={60}
        fps={30}
        width={512}
        height={512}
      />
      <Composition
        id="LogoWide"
        component={Logo}
        durationInFrames={60}
        fps={30}
        width={1200}
        height={630}
      />
    </>
  );
};

registerRoot(RemotionRoot);
