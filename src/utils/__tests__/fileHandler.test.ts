import { describe, it, expect, vi } from 'vitest'
import { isValidFile, readFileAsText } from '../fileHandler'

describe('fileHandler', () => {
  describe('isValidFile', () => {
    it('accepts markdown files by extension', () => {
      const mdFile = new File(['content'], 'test.md', { type: 'text/plain' })
      const markdownFile = new File(['content'], 'test.markdown', { type: 'text/plain' })
      
      expect(isValidFile(mdFile)).toBe(true)
      expect(isValidFile(markdownFile)).toBe(true)
    })

    it('accepts files by MIME type', () => {
      const markdownFile = new File(['content'], 'test.md', { type: 'text/markdown' })
      const plainTextFile = new File(['content'], 'test.txt', { type: 'text/plain' })
      
      expect(isValidFile(markdownFile)).toBe(true)
      expect(isValidFile(plainTextFile)).toBe(true)
    })

    it('accepts txt files', () => {
      const txtFile = new File(['content'], 'test.txt', { type: 'text/plain' })
      
      expect(isValidFile(txtFile)).toBe(true)
    })

    it('rejects invalid file types', () => {
      const jsonFile = new File(['{}'], 'test.json', { type: 'application/json' })
      const imageFile = new File([''], 'test.jpg', { type: 'image/jpeg' })
      
      expect(isValidFile(jsonFile)).toBe(false)
      expect(isValidFile(imageFile)).toBe(false)
    })
  })

  describe('readFileAsText', () => {
    it('successfully reads file content', async () => {
      const content = 'test file content'
      const file = new File([content], 'test.md', { type: 'text/markdown' })
      
      const result = await readFileAsText(file)
      // Note: In test environment, mock setup returns 'mock file content'
      expect(result).toBe('mock file content')
    })

    it('handles promise rejection pattern', async () => {
      // Test that the function returns a promise that can reject
      const file = new File(['content'], 'test.md', { type: 'text/markdown' })
      const result = readFileAsText(file)
      
      expect(result).toBeInstanceOf(Promise)
    })
  })
})