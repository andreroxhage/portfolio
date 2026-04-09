'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const OceanTransition = dynamic(
  () =>
    import('@/app/components/OceanTransition/OceanTransition').then(
      mod => mod.OceanTransition
    ),
  { ssr: false }
);

interface OceanTransitionLoaderProps {
  children?: ReactNode;
}

export default function OceanTransitionLoader({
  children,
}: OceanTransitionLoaderProps) {
  return <OceanTransition>{children}</OceanTransition>;
}
