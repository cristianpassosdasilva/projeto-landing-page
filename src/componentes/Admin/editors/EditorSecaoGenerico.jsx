import { useState } from 'react'
import { getValueAtPath, setValueAtPath } from '../../../utilitarios/caminhoObjeto'
import {
  AdminCard,
  CheckboxInput,
  ImageInput,
  MiniButton,
  RatingInput,
  TextArea,
  TextInput,
} from '../fields/AdminFields'
import GoogleReviewsPicker from './GoogleReviewsPicker'

function updateArrayItem(source, path, index, key, value) {
  return setValueAtPath(source, [...path, index, key], value)
}

function removeArrayItem(source, path, index) {
  const next = structuredClone(source)
  getValueAtPath(next, path).splice(index, 1)
  return next
}

function addArrayItem(source, path, item) {
  const next = structuredClone(source)
  getValueAtPath(next, path).push(item)
  return next
}

export default function EditorSecaoGenerico({ section, onChange, onUpload }) {
  const props = section.props

  function updateProp(path, value) {
    onChange({
      ...section,
      props: setValueAtPath(props, path, value),
    })
  }

  return (
    <>
      {'label' in props ? (
        <TextInput label="Etiqueta" value={props.label} onChange={(value) => updateProp(['label'], value)} />
      ) : null}
      {'badge' in props ? (
        <TextInput label="Badge" value={props.badge} onChange={(value) => updateProp(['badge'], value)} />
      ) : null}
      {'title' in props ? (
        <TextInput label="Título" value={props.title} onChange={(value) => updateProp(['title'], value)} />
      ) : null}
      {'heading' in props ? (
        <TextInput label="Chamada" value={props.heading} onChange={(value) => updateProp(['heading'], value)} />
      ) : null}
      {'highlight' in props ? (
        <TextInput label="Destaque" value={props.highlight} onChange={(value) => updateProp(['highlight'], value)} />
      ) : null}
      {'subtitle' in props ? (
        <TextArea label="Subtítulo" value={props.subtitle} onChange={(value) => updateProp(['subtitle'], value)} />
      ) : null}
      {'text' in props ? (
        <TextArea label="Texto" value={props.text} onChange={(value) => updateProp(['text'], value)} />
      ) : null}
      {'primaryCta' in props ? (
        <TextInput label="CTA principal" value={props.primaryCta} onChange={(value) => updateProp(['primaryCta'], value)} />
      ) : null}
      {'secondaryCta' in props ? (
        <TextInput label="CTA secundário" value={props.secondaryCta} onChange={(value) => updateProp(['secondaryCta'], value)} />
      ) : null}
      {'buttonText' in props ? (
        <TextInput label="Texto do botão" value={props.buttonText} onChange={(value) => updateProp(['buttonText'], value)} />
      ) : null}
      {'href' in props ? (
        <TextInput label="Link do botão" value={props.href} onChange={(value) => updateProp(['href'], value)} />
      ) : null}
      {'image' in props && section.type !== 'history' ? (
        <ImageInput label="Imagem" value={props.image} onChange={(value) => updateProp(['image'], value)} onUpload={onUpload} />
      ) : null}
      {'imageLabel' in props && section.type !== 'history' ? (
        <TextInput label="Legenda da imagem" value={props.imageLabel} onChange={(value) => updateProp(['imageLabel'], value)} />
      ) : null}
      {'phone' in props ? (
        <TextInput label="Telefone" value={props.phone} onChange={(value) => updateProp(['phone'], value)} />
      ) : null}
      {'phoneHref' in props ? (
        <TextInput label="Link telefone" value={props.phoneHref} onChange={(value) => updateProp(['phoneHref'], value)} />
      ) : null}
      {'whatsapp' in props ? (
        <TextInput label="WhatsApp" value={props.whatsapp} onChange={(value) => updateProp(['whatsapp'], value)} />
      ) : null}
      {'whatsappHref' in props ? (
        <TextInput label="Link WhatsApp" value={props.whatsappHref} onChange={(value) => updateProp(['whatsappHref'], value)} />
      ) : null}
      {'ratingText' in props ? (
        <TextInput label="Avaliação" value={props.ratingText} onChange={(value) => updateProp(['ratingText'], value)} />
      ) : null}
      {'cta' in props ? (
        <TextInput label="Chamada final" value={props.cta} onChange={(value) => updateProp(['cta'], value)} />
      ) : null}
      {'paragraphs' in props ? (
        <ArrayEditor
          addLabel="Adicionar parágrafo"
          items={props.paragraphs}
          newItem="Novo parágrafo."
          onAdd={() => onChange({ ...section, props: addArrayItem(props, ['paragraphs'], 'Novo parágrafo.') })}
          onRemove={(index) => onChange({ ...section, props: removeArrayItem(props, ['paragraphs'], index) })}
          renderItem={(paragraph, index) => (
            <TextArea label={`Parágrafo ${index + 1}`} value={paragraph} onChange={(value) => updateProp(['paragraphs', index], value)} />
          )}
        />
      ) : null}
      {'subjects' in props ? (
        <ArrayEditor
          addLabel="Adicionar assunto"
          items={props.subjects}
          newItem="Novo assunto"
          onAdd={() => onChange({ ...section, props: addArrayItem(props, ['subjects'], 'Novo assunto') })}
          onRemove={(index) => onChange({ ...section, props: removeArrayItem(props, ['subjects'], index) })}
          renderItem={(subject, index) => (
            <TextInput label={`Assunto ${index + 1}`} value={subject} onChange={(value) => updateProp(['subjects', index], value)} />
          )}
        />
      ) : null}
      {'items' in props && section.type === 'testimonials' ? (
        <GoogleReviewsPicker
          onAddItems={(newItems) => updateProp(['items'], [...props.items, ...newItems])}
          onUpdateRatingText={(value) => updateProp(['ratingText'], value)}
        />
      ) : null}
      {'items' in props ? (
        <ItemsEditor
          items={props.items}
          onChange={(nextItems) => updateProp(['items'], nextItems)}
          onUpload={onUpload}
        />
      ) : null}
      {'images' in props || section.type === 'history' ? (
        <ImagesEditor
          items={props.images || []}
          onChange={(nextImages) => updateProp(['images'], nextImages)}
          onUpload={onUpload}
        />
      ) : null}
    </>
  )
}

function ArrayEditor({ addLabel, items, onAdd, onRemove, renderItem }) {
  return (
    <AdminCard>
      {items.map((item, index) => (
        <div className="array-row" key={`${item}-${index}`}>
          {renderItem(item, index)}
          <MiniButton className="danger" onClick={() => onRemove(index)}>
            Remover
          </MiniButton>
        </div>
      ))}
      <MiniButton onClick={onAdd}>{addLabel}</MiniButton>
    </AdminCard>
  )
}

function ItemsEditor({ items, onChange, onUpload }) {
  const itemModelo = createItemModelo(items[0])
  const [selectedIndexes, setSelectedIndexes] = useState(() => new Set())

  function update(index, key, value) {
    onChange(updateArrayItem({ items }, ['items'], index, key, value).items)
  }

  function add() {
    onChange([...items, itemModelo])
  }

  function toggleSelected(index) {
    setSelectedIndexes((current) => {
      const next = new Set(current)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  function removeSelected() {
    onChange(items.filter((_, index) => !selectedIndexes.has(index)))
    setSelectedIndexes(new Set())
  }

  return (
    <AdminCard>
      {items.map((item, index) => (
        <div className="array-row" key={`item-${index}`}>
          <label className="check-field item-select">
            <input
              checked={selectedIndexes.has(index)}
              type="checkbox"
              onChange={() => toggleSelected(index)}
            />
            <span>Selecionar</span>
          </label>
          {'icon' in item ? (
            <TextInput label="Ícone" value={item.icon} onChange={(value) => update(index, 'icon', value)} />
          ) : null}
          {'label' in item ? (
            <TextInput label="Legenda" value={item.label} onChange={(value) => update(index, 'label', value)} />
          ) : null}
          {'initial' in item ? (
            <TextInput label="Inicial" value={item.initial} onChange={(value) => update(index, 'initial', value)} />
          ) : null}
          {'name' in item ? (
            <TextInput label="Nome" value={item.name} onChange={(value) => update(index, 'name', value)} />
          ) : null}
          {'location' in item ? (
            <TextInput label="Local" value={item.location} onChange={(value) => update(index, 'location', value)} />
          ) : null}
          {'quote' in item ? (
            <TextArea label="Depoimento" value={item.quote} onChange={(value) => update(index, 'quote', value)} />
          ) : null}
          {'quote' in item ? (
            <RatingInput label="Nota" value={item.rating ?? 5} onChange={(value) => update(index, 'rating', value)} />
          ) : null}
          {'question' in item ? (
            <TextInput label="Pergunta" value={item.question} onChange={(value) => update(index, 'question', value)} />
          ) : null}
          {'answer' in item ? (
            <TextArea label="Resposta" value={item.answer} onChange={(value) => update(index, 'answer', value)} />
          ) : null}
          {'question' in item ? (
            <CheckboxInput label="Exibir nas primeiras 4" value={item.featured ?? true} onChange={(value) => update(index, 'featured', value)} />
          ) : null}
          {'image' in item || 'icon' in item ? (
            <ImageInput label="Imagem" value={item.image ?? ''} onChange={(value) => update(index, 'image', value)} onUpload={onUpload} />
          ) : null}
          {'wide' in item ? (
            <CheckboxInput label="Imagem larga" value={item.wide} onChange={(value) => update(index, 'wide', value)} />
          ) : null}
          <MiniButton className="danger" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
            Remover
          </MiniButton>
        </div>
      ))}
      <div className="array-row-actions">
        <MiniButton onClick={add}>Adicionar item</MiniButton>
        {selectedIndexes.size > 0 ? (
          <MiniButton className="danger" onClick={removeSelected}>
            Remover selecionados ({selectedIndexes.size})
          </MiniButton>
        ) : null}
      </div>
    </AdminCard>
  )
}

function createItemModelo(item = {}) {
  if ('question' in item || 'answer' in item) {
    return { question: 'Nova pergunta?', answer: 'Nova resposta.', featured: false }
  }

  if ('quote' in item || 'name' in item || 'initial' in item) {
    return {
      initial: 'N',
      name: 'Nova cliente',
      location: 'Ituiutaba - MG',
      quote: 'Novo depoimento.',
      rating: 5,
    }
  }

  if ('image' in item || 'wide' in item) {
    return { label: 'Nova imagem', image: '', wide: false }
  }

  return { icon: '✨', label: 'Novo item', image: '' }
}

function ImagesEditor({ items, onChange, onUpload }) {
  function update(index, key, value) {
    onChange(updateArrayItem({ items }, ['items'], index, key, value).items)
  }

  return (
    <AdminCard>
      {items.map((item, index) => (
        <div className="array-row" key={`image-${index}`}>
          <TextInput label="Legenda" value={item.label} onChange={(value) => update(index, 'label', value)} />
          <ImageInput label="Imagem" value={item.image} onChange={(value) => update(index, 'image', value)} onUpload={onUpload} />
          <MiniButton className="danger" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}>
            Remover
          </MiniButton>
        </div>
      ))}
      <MiniButton
        onClick={() =>
          onChange([
            ...items,
            {
              label: 'Nova imagem',
              image: '',
              gradient: 'linear-gradient(135deg, #e9cfe4, #d080c0)',
            },
          ])
        }
      >
        Adicionar imagem
      </MiniButton>
    </AdminCard>
  )
}
