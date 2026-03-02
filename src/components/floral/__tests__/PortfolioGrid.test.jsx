import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '../../../test/utils'
import { PortfolioGrid } from '../PortfolioGrid'

const mockItems = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  title: `Item ${i + 1}`,
  category: 'weddings',
  description: `Description ${i + 1}`,
  image: `https://example.com/image-${i + 1}.jpg`,
}))

describe('PortfolioGrid', () => {
  it('renders empty state when no items', () => {
    render(<PortfolioGrid items={[]} onItemClick={() => {}} onItemRequest={() => {}} />)
    expect(screen.getByText('No items found in this category.')).toBeInTheDocument()
  })

  it('shows only first 6 items initially', () => {
    render(<PortfolioGrid items={mockItems} onItemClick={() => {}} onItemRequest={() => {}} />)
    const buttons = screen.getAllByRole('button', { name: /^View / })
    expect(buttons).toHaveLength(6)
  })

  it('shows Load More button when more items exist', () => {
    render(<PortfolioGrid items={mockItems} onItemClick={() => {}} onItemRequest={() => {}} />)
    expect(screen.getByText('Load More')).toBeInTheDocument()
    expect(screen.getByText('(4 remaining)')).toBeInTheDocument()
  })

  it('loads more items when Load More is clicked', () => {
    render(<PortfolioGrid items={mockItems} onItemClick={() => {}} onItemRequest={() => {}} />)
    fireEvent.click(screen.getByText('Load More'))
    const buttons = screen.getAllByRole('button', { name: /^View / })
    expect(buttons).toHaveLength(10)
  })

  it('hides Load More after all items loaded', () => {
    render(<PortfolioGrid items={mockItems} onItemClick={() => {}} onItemRequest={() => {}} />)
    fireEvent.click(screen.getByText('Load More'))
    expect(screen.queryByText('Load More')).not.toBeInTheDocument()
    expect(screen.getByText('Showing all 10 items')).toBeInTheDocument()
  })

  it('does not show Load More when items fit in one page', () => {
    const fewItems = mockItems.slice(0, 4)
    render(<PortfolioGrid items={fewItems} onItemClick={() => {}} onItemRequest={() => {}} />)
    expect(screen.queryByText('Load More')).not.toBeInTheDocument()
  })
})
