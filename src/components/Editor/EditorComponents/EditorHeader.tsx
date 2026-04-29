export const EditorHeader = () => {
  const vscodeTools = [
    {
      href: 'https://marketplace.visualstudio.com/items?itemName=KunalPathak.mermaid-slideshow',
      label: 'Mermaid Slideshow'
    },
    {
      href: 'https://marketplace.visualstudio.com/items?itemName=KunalPathak.markdown-presentation-tool',
      label: 'Markdown Presentation Tool'
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Mermaid Slides
          </h1>
          <p className="text-lg mb-3 text-gray-600">
            Upload <b>markdown</b> files with <b>mermaid</b> diagrams, and present the visuals in a <b>slideshow</b>.
          </p>
        </div>
      </div>

      <div className="text-center mb-4 text-gray-600">
        <p className="text-sm font-medium">Choose the option that works best for you:</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6 p-4 rounded-lg bg-gray-100">
        <div className="text-center flex-1">
          <div className="font-semibold text-gray-900">
            🌐 Web App
          </div>
          <div className="text-sm text-gray-600">
            Start creating slides instantly
          </div>
          <a
            href="https://mermaid-slides.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline mt-1 inline-block text-blue-600 hover:text-blue-800"
          >
            Visit mermaid-slides.com
          </a>
        </div>

        <div className="text-lg font-bold text-gray-500">OR</div>

        <div className="text-center flex-1">
          <div className="font-semibold text-gray-900">
            💻 Use Locally
          </div>
          <div className="text-sm text-gray-600">
            Docker or Offline Package
          </div>
          <a
            href="https://github.com/kanad13/mermaid-slides/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline mt-1 inline-block text-blue-600 hover:text-blue-800"
          >
            Download offline package
          </a>
        </div>

        <div className="text-lg font-bold text-gray-500">OR</div>

        <div className="text-center flex-1">
          <div className="font-semibold text-gray-900">
            🔧 VS Code Tools
          </div>
          <div className="text-sm text-gray-600">
            Present Mermaid-only or full Markdown decks inside VS Code
          </div>
          <div className="mt-1 flex flex-col gap-1">
            {vscodeTools.map((tool) => (
              <a
                key={tool.href}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline inline-block text-blue-600 hover:text-blue-800"
              >
                {tool.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
