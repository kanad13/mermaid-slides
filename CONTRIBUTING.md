# Contributing to Mermaid Slides

Thank you for your interest in contributing to Mermaid Slides! This document provides guidelines and information for contributors.

## 🤝 Ways to Contribute

### 🐛 Bug Reports

- Use the GitHub issue template
- Include browser version and operating system
- Provide steps to reproduce the issue
- Include sample markdown content if relevant

### 💡 Feature Requests

- Describe the problem you're trying to solve
- Explain how the feature would help users
- Consider backward compatibility
- Provide mockups or examples if applicable

### 📖 Documentation

- Improve README clarity
- Add usage examples
- Create tutorial content
- Fix typos and grammar

### 💻 Code Contributions

- Follow the development setup guide
- Ensure all tests pass
- Follow code style guidelines
- Update documentation as needed

## 🏗️ Development Setup

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Text editor or IDE
- Basic knowledge of HTML, CSS, JavaScript, and React

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/mermaid-slides.git
cd mermaid-slides

# No build process - just serve the files
python -m http.server 8000
# or
npx serve .

# Open http://localhost:8000
```

### Project Structure

```
mermaid-slides/
├── README.md                 # Project documentation
├── index.html               # Main application file
├── docs/                    # Additional documentation
├── examples/                # Sample markdown files
├── offline/                 # Self-contained version
└── dist/                   # Built versions for deployment
```

## 📝 Code Style Guidelines

### HTML/CSS

- Use semantic HTML elements
- Follow Tailwind CSS utility-first approach
- Maintain consistent indentation (2 spaces)
- Add comments for complex styling

### JavaScript/React

- Use functional components with hooks
- Follow React best practices
- Use descriptive variable and function names
- Add JSDoc comments for complex functions
- Prefer const over let, avoid var

### Example:

```javascript
/**
 * Parses markdown content to extract mermaid diagrams
 * @param {string} markdownText - Raw markdown content
 * @returns {Array<Object>} Array of diagram objects
 */
const parseMermaidDiagrams = (markdownText) => {
	// Implementation here
};
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] File upload (drag & drop, file picker)
- [ ] Markdown parsing with various diagram types
- [ ] Navigation (keyboard, buttons, thumbnails)
- [ ] Theme switching (dark/light, mermaid themes)
- [ ] Grid view and single view modes
- [ ] Responsive design on different screen sizes
- [ ] Error handling for invalid content

### Browser Testing

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Edge

### Sample Test Content

Use the provided examples in the `examples/` folder to test various scenarios:

- Simple flowcharts
- Complex sequence diagrams
- Multiple diagram types in one file
- Edge cases and error conditions

## 🚀 Pull Request Process

### Before You Start

1. Check existing issues and PRs to avoid duplicates
2. Create an issue to discuss major changes
3. Fork the repository and create a feature branch

### Pull Request Checklist

- [ ] Clear, descriptive title and description
- [ ] Reference related issues (fixes #123)
- [ ] Test your changes thoroughly
- [ ] Update documentation if needed
- [ ] Follow the code style guidelines
- [ ] Keep changes focused and atomic

### PR Template

```markdown
## Description

Brief description of changes and motivation.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing

- [ ] Manual testing completed
- [ ] Cross-browser testing done
- [ ] No breaking changes introduced

## Screenshots (if applicable)

Add screenshots to help reviewers understand the changes.
```

## 🎯 Priority Areas for Contribution

### High Priority

- **Accessibility improvements** (ARIA labels, keyboard navigation)
- **Performance optimizations** (large file handling, memory usage)
- **Cross-browser compatibility** fixes
- **Error handling** and user feedback

### Medium Priority

- **New Mermaid diagram types** support
- **Export functionality** (PDF, images)
- **Keyboard shortcuts** documentation and improvement
- **Mobile experience** enhancements

### Low Priority

- **Animation and transitions** improvements
- **Additional themes** and customization options
- **Advanced features** (bookmarks, annotations)
- **Integration examples** with other tools

## 🐛 Bug Report Template

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**

- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS 12.0]
- Version: [e.g. latest from main branch]

**Sample Content**
If relevant, provide the markdown content that causes the issue.
```

## 💡 Feature Request Template

```markdown
**Feature Description**
A clear description of what you want to happen.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
Describe your preferred solution.

**Alternatives**
Describe alternatives you've considered.

**Use Case**
Provide specific examples of how this would be used.

**Additional Context**
Add any other context or screenshots about the feature request.
```

## 📚 Resources

### Learning Resources

- [Mermaid.js Documentation](https://mermaid.js.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Project-Specific Resources

- [Project Requirements](PROJECT_REQUIREMENTS.md)
- [Feature Documentation](docs/FEATURES.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## ❓ Questions and Support

### Getting Help

- **GitHub Discussions** - For questions and community support
- **GitHub Issues** - For bug reports and feature requests
- **Email** - [your-email@example.com] for private concerns

### Response Times

- **Issues**: We aim to respond within 48 hours
- **Pull Requests**: Initial review within 72 hours
- **Security Issues**: Within 24 hours via email

## 🏆 Recognition

Contributors are recognized in several ways:

- Listed in the README contributors section
- Mentioned in release notes for significant contributions
- Invited to join the maintainers team for sustained contributions

## 📄 License

By contributing to Mermaid Slides, you agree that your contributions will be licensed under the same MIT License that covers the project.

## 🙏 Acknowledgments

Thank you to all contributors who help make Mermaid Slides better for everyone!

---

**Questions?** Feel free to reach out via GitHub Discussions or email. We're here to help!
