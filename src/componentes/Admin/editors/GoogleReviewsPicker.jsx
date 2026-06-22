import { useState } from 'react'
import { fetchGoogleReviews } from '../../../servicos/conteudoService'
import { AdminCard, MiniButton } from '../fields/AdminFields'

function reviewToItem(review) {
  return {
    initial: (review.authorName || '?').trim().charAt(0).toUpperCase(),
    name: review.authorName || 'Cliente Google',
    location: 'Avaliação Google',
    quote: review.text || '',
    rating: review.rating ?? 5,
  }
}

export default function GoogleReviewsPicker({ onAddItems, onUpdateRatingText }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [reviews, setReviews] = useState([])
  const [selectedIds, setSelectedIds] = useState(() => new Set())
  const [summary, setSummary] = useState(null)

  async function handleFetch() {
    setStatus('loading')
    setError('')

    try {
      const data = await fetchGoogleReviews()
      setReviews(data.reviews || [])
      setSelectedIds(new Set())
      setSummary(
        data.rating != null
          ? { rating: data.rating, total: data.userRatingsTotal }
          : null,
      )
      setStatus('loaded')
    } catch (fetchError) {
      setError(fetchError.message)
      setStatus('error')
    }
  }

  function handleUseRating() {
    if (!summary) {
      return
    }

    onUpdateRatingText(`${summary.rating.toFixed(1)} nas avaliações`)
  }

  function toggleSelected(id) {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function handleAddSelected() {
    const selectedItems = reviews
      .filter((review) => selectedIds.has(review.id))
      .map(reviewToItem)

    if (selectedItems.length === 0) {
      return
    }

    onAddItems(selectedItems)
    setReviews((current) => current.filter((review) => !selectedIds.has(review.id)))
    setSelectedIds(new Set())
  }

  return (
    <AdminCard>
      <div className="google-reviews-head">
        <h3>Avaliações do Google</h3>
        <MiniButton onClick={handleFetch}>
          {status === 'loading' ? 'Buscando...' : 'Buscar avaliações do Google'}
        </MiniButton>
      </div>

      {error ? <p className="form-status error">{error}</p> : null}

      {summary ? (
        <div className="google-rating-summary">
          <span>
            Nota geral no Google: <strong>{summary.rating.toFixed(1)}</strong>
            {summary.total != null ? ` (${summary.total} avaliações)` : ''}
          </span>
          <MiniButton onClick={handleUseRating}>
            Usar essa nota no subtítulo dos depoimentos
          </MiniButton>
        </div>
      ) : null}

      {reviews.length > 0 ? (
        <>
          <div className="google-reviews-grid">
            {reviews.map((review) => (
              <label className="google-review-card" key={review.id}>
                <input
                  checked={selectedIds.has(review.id)}
                  type="checkbox"
                  onChange={() => toggleSelected(review.id)}
                />
                <div className="google-review-who">
                  {review.authorPhoto ? (
                    <img alt="" src={review.authorPhoto} />
                  ) : (
                    <span className="avatar">{(review.authorName || '?').charAt(0)}</span>
                  )}
                  <div>
                    <strong>{review.authorName}</strong>
                    <small>{review.relativeTime}</small>
                  </div>
                </div>
                <div className="stars">
                  {'★'.repeat(review.rating ?? 5)}
                  {'☆'.repeat(5 - (review.rating ?? 5))}
                </div>
                <p>"{review.text}"</p>
              </label>
            ))}
          </div>
          <MiniButton onClick={handleAddSelected}>
            Adicionar selecionadas aos depoimentos ({selectedIds.size})
          </MiniButton>
        </>
      ) : null}

      {status === 'loaded' && reviews.length === 0 ? (
        <p className="form-status">Nenhuma avaliação encontrada.</p>
      ) : null}
    </AdminCard>
  )
}
