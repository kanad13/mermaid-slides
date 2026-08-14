import { Modal } from './Modal';
import { MAINTAINER } from './maintainer';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const Section: React.FC<{ heading: string; children: React.ReactNode }> = ({
  heading,
  children
}) => (
  <section className="space-y-2">
    <h3 className="font-semibold">{heading}</h3>
    {children}
  </section>
);

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => (
  <Modal title="Privacy Policy" onClose={onClose} widthClassName="max-w-3xl">
    <div className="text-sm leading-relaxed space-y-5">
      <p className="text-gray-600">Effective 14 August 2026</p>

      <Section heading="Who is responsible">
        <p>
          Mermaid Slides is a non-commercial open-source project maintained by{' '}
          {MAINTAINER.name}. It is the controller for the little data described
          below. Contact:{' '}
          <a
            href={MAINTAINER.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {MAINTAINER.websiteLabel}
          </a>{' '}
          or{' '}
          <a
            href={MAINTAINER.issuesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            GitHub Issues
          </a>
          .
        </p>
      </Section>

      <Section heading="What we collect">
        <p>
          Nothing. Mermaid Slides has no analytics, no telemetry and no tracking
          of any kind. It sets no cookies and writes nothing to local storage,
          session storage or a service worker. Closing the tab leaves no trace
          of your session behind.
        </p>
        <p>
          Because we collect nothing, there is nothing to retain, nothing to
          share and nothing to sell. There is no advertising, no social media
          integration and no third-party script of any kind in this page.
        </p>
      </Section>

      <Section heading="Your content">
        <p>
          Your markdown is never uploaded. Parsing and diagram rendering happen
          entirely in your browser, and no version of this app has a server to
          send it to.
        </p>
      </Section>

      <Section heading="Remote images">
        <p>
          One thing does leave your device, and only if you ask for it. If your
          markdown references an image by URL —{' '}
          <code className="text-xs">![chart](https://example.com/chart.png)</code>{' '}
          — your browser fetches it, and that request tells the hosting server
          your IP address and browser details. That is how images work on the
          web.
        </p>
        <p>
          We allow it deliberately: you put that image in your document on
          purpose, and quietly refusing to load it would break real
          presentations. If you would rather nothing left your device at all,
          use local image files or diagrams only.
        </p>
      </Section>

      <Section heading="Security">
        <p>
          Every distribution enforces a Content-Security-Policy. Scripts may
          only load from the app&apos;s own files and inline script is refused,
          so a markdown file cannot run code in the page even if it tries.
        </p>
      </Section>

      <Section heading="Hosting">
        <p>
          The web version is hosted on GitHub Pages and may be delivered through
          Cloudflare. Both may record technical information such as your IP
          address, and Cloudflare may set strictly necessary cookies for
          security and load balancing. Those are theirs, not ours, and are not
          used for profiling. Both may process that data outside the European
          Union under standard contractual clauses. See the GitHub and
          Cloudflare privacy statements for details.
        </p>
        <p>
          The offline package and the Docker image involve no third party at
          all. If you want to avoid this entirely, use one of those.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          Under the GDPR you may request access to your personal data, ask for
          it to be corrected or erased, object to or restrict its processing,
          and ask for it in portable form. You may also complain to your local
          data protection authority.
        </p>
        <p>
          In practice we hold no personal data about you, so there is nothing
          for us to hand over or delete. Requests concerning data held by our
          hosting providers should go to them directly. You can still reach the
          maintainer at the contacts above.
        </p>
      </Section>

      <Section heading="Changes">
        <p>
          This policy may change. The current version always ships with the app
          you are running, and its history is public in the repository.
        </p>
      </Section>
    </div>
  </Modal>
);
