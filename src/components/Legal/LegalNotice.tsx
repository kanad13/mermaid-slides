import { Modal } from './Modal';

interface LegalNoticeProps {
  onClose: () => void;
}

export const LegalNotice: React.FC<LegalNoticeProps> = ({ onClose }) => (
  <Modal title="Legal Notice" onClose={onClose}>
    <div className="text-sm leading-relaxed space-y-4">
      <section>
        <h3 className="font-semibold mb-2">Contact</h3>
        <p>For questions, issues, or feedback regarding this website, please use:</p>
        <p className="mt-2">
          <a
            href="https://github.com/kanad13/mermaid-slides/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub Issues
          </a>
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Purpose</h3>
        <p>
          This is a non-commercial, open-source educational tool for creating presentation slides from
          Mermaid diagrams.
        </p>
      </section>

      <section>
        <h3 className="font-semibold mb-2">Repository</h3>
        <p>
          <a
            href="https://github.com/kanad13/mermaid-slides"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://github.com/kanad13/mermaid-slides
          </a>
        </p>
      </section>
    </div>
  </Modal>
);
