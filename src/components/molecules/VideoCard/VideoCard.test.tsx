import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VideoCard from './VideoCard';

describe('VideoCard', () => {
  it('renderiza título e play label', () => {
    render(
      <VideoCard
        title="Como contratar\nseu seguro"
        playLabel="Assistir"
        imageUrl="https://example.com/video.jpg"
      />,
    );

    expect(screen.getByText('Assistir')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });
});
