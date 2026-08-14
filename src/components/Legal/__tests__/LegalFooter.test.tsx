import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LegalFooter } from '../LegalFooter';

describe('LegalFooter', () => {
  it('shows neither document until one is requested', () => {
    render(<LegalFooter />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the privacy policy and closes it with the close button', () => {
    render(<LegalFooter />);

    fireEvent.click(screen.getByRole('button', { name: 'Privacy Policy' }));

    const dialog = screen.getByRole('dialog', { name: 'Privacy Policy' });
    expect(dialog).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close Privacy Policy' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    render(<LegalFooter />);

    fireEvent.click(screen.getByRole('button', { name: 'Legal Notice' }));
    expect(screen.getByRole('dialog', { name: 'Legal Notice' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens only one document at a time', () => {
    render(<LegalFooter />);

    fireEvent.click(screen.getByRole('button', { name: 'Privacy Policy' }));
    fireEvent.click(screen.getByRole('button', { name: 'Close Privacy Policy' }));
    fireEvent.click(screen.getByRole('button', { name: 'Legal Notice' }));

    expect(screen.getAllByRole('dialog')).toHaveLength(1);
    expect(screen.getByRole('dialog', { name: 'Legal Notice' })).toBeInTheDocument();
  });

  it('states plainly that remote images leave the device', () => {
    render(<LegalFooter />);
    fireEvent.click(screen.getByRole('button', { name: 'Privacy Policy' }));

    expect(screen.getByRole('heading', { name: 'Remote images' })).toBeInTheDocument();
    expect(screen.getByText(/IP address and browser details/)).toBeInTheDocument();
  });

  // The GDPR disclosures were removed from the policy once by hand. These keep
  // that from happening silently: each is required by Article 13.
  it('names a controller and gives a way to contact them', () => {
    render(<LegalFooter />);
    fireEvent.click(screen.getByRole('button', { name: 'Privacy Policy' }));

    expect(screen.getByRole('heading', { name: 'Who is responsible' })).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: 'kunal-pathak.com' }).length
    ).toBeGreaterThan(0);
  });

  it('sets out data subject rights and the right to complain', () => {
    render(<LegalFooter />);
    fireEvent.click(screen.getByRole('button', { name: 'Privacy Policy' }));

    expect(screen.getByRole('heading', { name: 'Your rights' })).toBeInTheDocument();
    expect(screen.getByText(/data protection authority/)).toBeInTheDocument();
  });

  it('discloses the hosting providers and transfers outside the EU', () => {
    render(<LegalFooter />);
    fireEvent.click(screen.getByRole('button', { name: 'Privacy Policy' }));

    expect(screen.getByText(/standard contractual clauses/)).toBeInTheDocument();
  });

  it('credits the maintainer in the footer itself', () => {
    render(<LegalFooter />);

    const link = screen.getByRole('link', { name: 'Kunal Pathak' });
    expect(link).toHaveAttribute('href', 'https://www.kunal-pathak.com');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
