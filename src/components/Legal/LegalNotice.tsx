import { Modal } from './Modal';
import { MAINTAINER } from './maintainer';

interface LegalNoticeProps {
  onClose: () => void;
}

const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    {children}
  </a>
);

export const LegalNotice: React.FC<LegalNoticeProps> = ({ onClose }) => (
  <Modal title="Legal Notice" onClose={onClose}>
    <div className="text-sm leading-relaxed space-y-4">
      <section>
        <h3 className="font-semibold mb-2">Responsible for this site</h3>
        <p>{MAINTAINER.name}</p>
        <p className="mt-1">
          <ExternalLink href={MAINTAINER.website}>
            {MAINTAINER.websiteLabel}
          </ExternalLink>
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Contact</h3>
        <p>
          For questions, issues or feedback about this site, please use{' '}
          <ExternalLink href={MAINTAINER.issuesUrl}>GitHub Issues</ExternalLink>
          , or get in touch through{' '}
          <ExternalLink href={MAINTAINER.website}>
            {MAINTAINER.websiteLabel}
          </ExternalLink>
          .
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Purpose</h3>
        <p>
          This is a non-commercial, open-source educational tool for creating
          presentation slides from Mermaid diagrams. It is offered free of
          charge, carries no advertising, and is not operated for profit.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Repository and licence</h3>
        <p>
          Source code is public at{' '}
          <ExternalLink href={MAINTAINER.repositoryUrl}>
            github.com/kanad13/mermaid-slides
          </ExternalLink>{' '}
          under the MIT Licence.
        </p>
        <p className="mt-2">
          This project is independent and is not an official product of the
          Mermaid.js team. It uses the Mermaid.js library under its MIT Licence.
        </p>
      </section>
    </div>
  </Modal>
);
